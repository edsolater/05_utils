import { useMemo, useState } from 'react'

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
  const controller = useMemo(
    () => ({
      on: () => setIsOn(true),
      off: () => setIsOn(false),
      toggle: () => setIsOn((b) => b!)
    }),
    [setIsOn]
  )
  return [isOn, controller]
}
