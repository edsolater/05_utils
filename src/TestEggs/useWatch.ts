import { useEffect, useRef } from 'react'

/**
 * 用法类似useEffect
 * @param callback
 * @param value 单个元素
 */
export default function useWatch<T>(callback: (cur: NonNullable<T>, prev: NonNullable<T>) => void, value: T) {
  const newValue = useRef(value)
  useEffect(() => {
    const prev = newValue.current
    const cur = value
    if (cur !== prev) callback(cur!, prev!)
    newValue.current = cur
  }, [value])
}
