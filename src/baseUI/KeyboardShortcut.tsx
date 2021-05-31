import React, { createContext, useContext, useEffect, useRef } from 'react'
import { ReactProps } from 'typings/constants'

// TODO: should create a ShortcutItem class, which's return may has this structure
interface RawShortcutItem {
  /**
   * @example
   * 'ctrl+R'
   * ['ctrl', 'R']
   */
  key: Key | Key[] | string
  callback: (ev: KeyboardEvent) => void
  /**
   * the callback will only be invoke if element or its children is focused
   *
   * defaultly, it will listen any keyDown globally
   */
  whenFocusElement?: HTMLElement
  description?: string
}

interface KeyboardShortcutController {
  /** @immutable */
  getCurrentShortcut(): ShortcutItem[]
  /** @mutable TODO: why not just use javascript function*/
  registShortcut(shortcutItem: ShortcutItem | RawShortcutItem): void
  /** @mutable TODO: why not just use javascript function*/
  clear(): void
}

const emptyContext = {
  getCurrentShortcut: () => {
    throw new Error(`Opps! You should load ${KeyboardShortcutContext.displayName} manually!`)
  },
  registShortcut: () => {
    throw new Error(`Opps! You should load ${KeyboardShortcutContext.displayName} manually`)
  },
  clear: () => {
    throw new Error(`Opps! You should load ${KeyboardShortcutContext.displayName} manually`)
  }
}

const KeyboardShortcutContext = createContext<KeyboardShortcutController>(emptyContext)

/**
 * component render a Provider that hold all interactive UI's shortcut
 *
 * NOTE: if app isn't big, U should just use window addEventListener('keydown')
 *
 *
 * @JSComponet U can regist an shortcut through hooks: useKeyboardShortcut
 */
export default function KeyboardShortcutProvider(props: ReactProps) {
  const globalShortcutList = useRef<ShortcutItem[]>([])
  return (
    <KeyboardShortcutContext.Provider
      value={{
        getCurrentShortcut() {
          return globalShortcutList.current
        },
        registShortcut(shortcutItem: ShortcutItem | RawShortcutItem) {
          globalShortcutList.current.push(new ShortcutItem(shortcutItem))
        },
        clear() {
          globalShortcutList.current = []
        }
      }}
    >
      {props.children}
    </KeyboardShortcutContext.Provider>
  )
}

//IDEA: should overload
// export function useKeyboardShortcutRegister(key:string, callbackFunction:()=>void)
export function useGlobalKeyboardShortcutRegister(options: { key: string; cb: () => void }) {
  const controllers = useContext(KeyboardShortcutContext)
  return controllers
}
export function useKeyboardShortcutRegister(
  dom: HTMLElement,
  options: ShortcutItem | /* TODO: how to return immediately? */ RawShortcutItem
) {
  useEffect(() => {
    if (!dom) return
    const shortcutItem = new ShortcutItem(options)
    const shortcutHandler = (ev: KeyboardEvent) => {
      if (
        shortcutItem.charKey === ev.key.toLowerCase() &&
        shortcutItem.hasCtrl === ev.ctrlKey &&
        shortcutItem.hasAlt === ev.altKey &&
        shortcutItem.hasShift === ev.shiftKey
      ) {
        shortcutItem.callback(ev)
      }
    }
    dom.addEventListener('keydown', shortcutHandler, { passive: true })
    return () => dom.removeEventListener('keydown', shortcutHandler)
  }, [dom])
}

//#region ------------------- wrapper class: ShortcutItem -------------------
type Key = string
export class ShortcutItem {
  charKey: Key | undefined
  hasCtrl!: boolean // FIXME: 这样不可读，弃了
  hasAlt!: boolean
  hasShift!: boolean
  callback!: (ev: KeyboardEvent) => void
  /**
   * the callback will only be invoke if element or its children is focused
   *
   * defaultly, it will listen any keyDown globally
   */
  whenFocusElement?: HTMLElement
  description?: string
  constructor(item: ShortcutItem | /* TODO: how to return immediately? */ RawShortcutItem) {
    if (item instanceof ShortcutItem) return item
    this.description = item.description
    this.whenFocusElement = item.whenFocusElement
    this.callback = item.callback
    const { hasCtrl, hasAlt, hasShift, charKey } = parseKey(item.key)
    this.charKey = charKey
    this.hasCtrl = hasCtrl
    this.hasAlt = hasAlt
    this.hasShift = hasShift
  }
}
function parseKey(key: RawShortcutItem['key']) {
  const keyArr = (typeof key === 'string' ? key.split('+') : key).map((s) => s.toLowerCase().trim())
  return {
    hasCtrl: keyArr.some((s) => s === 'ctrl'),
    hasAlt: keyArr.some((s) => s === 'alt'),
    hasShift: keyArr.some((s) => s === 'shift'),
    charKey: keyArr.find((s) => /^\w$/.test(s))
  }
}
//#endregion
