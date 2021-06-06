import { useCallback, useMemo, useRef, useState } from 'react'
import { shrinkToValue } from 'utils/functions/magic/shrinkToValue'

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

/**
 * useRef but use similar API
 * @param initValue
 */
export function useToggle_Ref(
  initValue: boolean | (() => boolean) = false
): [
  () => boolean,
  {
    on: () => void
    off: () => void
    toggle: () => void
  }
] {
  const isOn = useRef(shrinkToValue(initValue))
  const showCurrent = useCallback(() => isOn.current, [])
  const on = useCallback(() => (isOn.current = true), [])
  const off = useCallback(() => (isOn.current = false), [])
  const toggle = useCallback(() => (isOn.current = !isOn.current), [])
  const controller = useMemo(
    () => ({
      on,
      off,
      toggle
    }),
    [off, on, toggle]
  )
  return [showCurrent, controller]
}
