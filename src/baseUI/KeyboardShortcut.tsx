import React, { createContext, useContext, useEffect, useRef } from 'react'
import { AnyFn, ReactProps } from 'typings/constants'

// TODO: should create a ShortcutItem class, which's return may has this structure
interface ShortcutItem {
  key: string
  callback: (ev: KeyboardEvent) => void
  /**
   * the callback will only be invoke if element or its children is focused
   *
   * defaultly, it will listen any keyDown globally
   */
  focusElement?: HTMLElement
  description?: string
}
interface KeyboardShortcutController {
  /** @immutable */
  getCurrentShortcut(): ShortcutItem[]
  /** @mutable TODO: why not just use javascript function*/
  registShortcut(shortcutItem: ShortcutItem): void
  /** @mutable TODO: why not just use javascript function*/
  clear(): void
}

const emptyContext = {
  getCurrentShortcut: () => [],
  registShortcut: () => undefined,
  clear: () => undefined
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
export default function KeyboardShortcut(props: ReactProps) {
  const shortcutList = useRef<ShortcutItem[]>([])
  useEffect(() => {
    window.addEventListener(
      'keydown',
      (ev) => {
        for (const shortcutItem of shortcutList.current) {
          if (shortcutItem.key === ev.key) {
            // TEMP: 先用最理想化的情况简单实现
            shortcutItem.callback(ev)
          }
        }
      },
      { passive: true }
    )
  }, [])

  return (
    <KeyboardShortcutContext.Provider
      value={{
        getCurrentShortcut() {
          return shortcutList.current
        },
        registShortcut(shortcutItem: ShortcutItem) {
          shortcutList.current.push(shortcutItem)
        },
        clear() {
          shortcutList.current = []
        }
      }}
    >
      {props.children}
    </KeyboardShortcutContext.Provider>
  )
}

export function useKeyboardShortcut() {
  const controllers = useContext(KeyboardShortcutContext)
  return controllers
}
