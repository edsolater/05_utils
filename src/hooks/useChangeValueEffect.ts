import { useEffect, useRef } from 'react'

/**
 * 用法类似useEffect
 * @param callback
 * @param value 单个元素
 */
export default function useChangeValueEffect<Value>(callback: (cur: NonNullable<Value>, prev: NonNullable<Value>) => void, value: Value) {
  const newValue = useRef(value)
  useEffect(() => {
    const prev = newValue.current
    const cur = value
    if (cur !== prev) callback(cur!, prev!)
    newValue.current = cur
  }, [value])
}
