import { useEffect, useRef } from 'react'

/**
 * The difference with React.useEffect: it will not invoke callback when in initial lifecycle
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