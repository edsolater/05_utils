import { useRef } from 'react'

interface RecordRef<T> {
  current: T
  readonly prev: T | undefined
  /**回到初始状态 */
  restart(): void
}
/**
 * 用法类似useEffect
 * @param callback
 * @param value 单个元素
 */
export default function useRecordRef<T = undefined>(): RecordRef<T | undefined>
export default function useRecordRef<T>(initialValue: T): RecordRef<T>
export default function useRecordRef<T>(...args: T[]) {
  const initValue = args[0] ?? undefined
  const prevValue = useRef<T | undefined>(undefined)
  const currentValue = useRef<T | undefined>(initValue)
  const proxyedRef: RecordRef<T | undefined> = new Proxy(
    {
      ...currentValue,
      get prev() {
        return prevValue.current
      },
      restart() {
        currentValue.current = initValue
        prevValue.current = undefined
      }
    },
    {
      set: (target, propName, value) => {
        if (propName === 'current') {
          prevValue.current = target.current
          target.current = value
        }
        return true
      }
    }
  )
  return proxyedRef
}
