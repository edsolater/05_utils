import { useRef } from 'react'

/**
 * 约定 ref 一定是 { current: xxx } 结构的，即使是 callback ref
 * 如果一定要用，用返回proxy的useCallbackRef， 相同 { current: xxx } 结构下，有了callbackRef的效果
 * @return proxied { current: xxx }
 */
export default function useCallbackRef<T = unknown>(callback: (current: T) => void) {
  const originalRef = useRef<T>()
  const proxied = useRef(
    new Proxy(originalRef, {
      set(target, p, value) {
        callback(value)
        return Reflect.set(target, p, value)
      }
    })
  )
  return proxied.current
}
