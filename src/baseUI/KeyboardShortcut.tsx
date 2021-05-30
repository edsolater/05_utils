import { createContext, useContext, useEffect, useState } from 'react'
import { AnyFn, ReactProps } from 'typings/constants'

const KeyboardShortcutContext = createContext({})
/**
 * component render a Provider that hold all interactive UI's shortcut
 * 
 * NOTE: if app isn't big, U should just use window addEventListener('keydown')
 * 
 *
 * @JSComponet U can regist an shortcut through hooks: useKeyboardShortcut
 */
export default function KeyboardShortcut(props: ReactProps) {
  const [keyboardShortcut, setKeyboardShortcut] = useState([])
  useEffect(() => {
    window.addEventListener('keydown', (ev) => {//TODO
    })
  }, [])
  return (
    <KeyboardShortcutContext.Provider
      value={{
        currentShortcut: keyboardShortcut,
        registShortcut(shortcutItem: {
          key: string
          callback: AnyFn
          focusElement?: HTMLElement
          description?: string
        }) {
          setKeyboardShortcut((old) => old.concat(shortcutItem))
        },
        clear() {
          setKeyboardShortcut([])
        }
      }}
    >
      {props.children}
    </KeyboardShortcutContext.Provider>
  )
}
