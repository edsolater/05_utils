import { useCallback, useMemo, useState } from 'react'

/**
 * it too widely use that there should be a hook
 * @param initValue
 */
export default function useToggle(
  initValue: boolean | (() => boolean) = false
): [
  boolean,
  {
    on: () => void
    off: () => void
    toggle: () => void
  }
] {
  const [isOn, setIsOn] = useState(initValue)
  const on = useCallback(() => setIsOn(true), [])
  const off = useCallback(() => setIsOn(false), [])
  const toggle = useCallback(() => setIsOn((b) => !b), [])
  const controller = useMemo(
    () => ({
      on,
      off,
      toggle
    }),
    [off, on, toggle]
  )
  return [isOn, controller]
}
