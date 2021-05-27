import { useEffect, useRef } from 'react'

/**
 * 与useEffect的区别是：初始化时，不触发回调
 */
export default function useUpdateEffect(
  effect: Parameters<typeof useEffect>[0],
  deps?: Parameters<typeof useEffect>[1]
) {
  const isInit = useRef(true)
  useEffect(() => {
    if (isInit.current === false) {
      return effect()
    } else {
      isInit.current = false
    }
  }, deps)
}
