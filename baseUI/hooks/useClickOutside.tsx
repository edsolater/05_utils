import { RefObject, useEffect, useMemo } from 'react'
import { isFunction } from 'utils/functions/judgers'

export interface UseClickOutsideOptions {
  disable?: boolean
  /**
   * 点击了元素区域外（此事件必须冒泡到document）
   */
  callback?: (ev: { el: HTMLElement; nativeEvent: MouseEvent }) => void
}

export default function useClickOutside(
  domRef: RefObject<HTMLElement>,
  opt: UseClickOutsideOptions | UseClickOutsideOptions['callback']
) {
  const disable = isFunction(opt) ? false : opt?.disable
  const callback = useMemo(() => (isFunction(opt) ? opt : opt?.callback), [])
  useEffect(() => {
    if (disable || !callback) return
    const WhenClickOutside = (e: MouseEvent) => {
      const isOutside = e.composedPath().includes(domRef.current!)
      if (!isOutside) return
      callback({ el: domRef.current!, nativeEvent: e })
    }
    document.addEventListener('click', WhenClickOutside)
    return () => document.removeEventListener('click', WhenClickOutside)
  }, [disable])
}
