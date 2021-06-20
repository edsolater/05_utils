import { useRef } from 'react'

interface RecordRef<T> {
  current: T
  readonly prev: T
  /**回到初始状态 */
  reset(): void
}
/**
 * 用法类似 `useRef`
 * 但是除了 `current` 外还有 `prev` ，
 */
export default function useRecordRef<T = undefined>(): RecordRef<T | undefined>
export default function useRecordRef<T>(initialValue: T): RecordRef<T>
export default function useRecordRef<T>(...args: T[]) {
  const initValue = args[0] ?? undefined
  const prevValue = useRef<T | undefined>(undefined)
  const currentValue = useRef<T | undefined>(initValue)
  return {
    get current() {
      return currentValue.current
    },
    set current(val) {
      prevValue.current = currentValue.current
      currentValue.current = val
    },
    get prev() {
      return prevValue.current
    },
    reset() {
      currentValue.current = initValue
      prevValue.current = undefined
    }
  }
}
