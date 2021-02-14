import { useRef } from 'react'

interface RecordedRef<T> {
  current: T
  readonly prev: T
}
/**
 * 用法类似useEffect
 * @param callback
 * @param value 单个元素
 */
export default function useRecordedRef<T>(initValue?: T) {
  const prevValue = useRef<T | undefined>()
  const currentValue = useRef(initValue)
  // @ts-expect-error
  const proxyedRef: RecordedRef<T> = new Proxy(currentValue, {
    set: (target, propName, value) => {
      if (propName === 'current') {
        prevValue.current = target.current
        target.current = value
      }
      return true
    },
    get: (target, propName) => {
      if (propName === 'prev') return prevValue.current
      else return target[propName]
    }
  })
  return proxyedRef
}
