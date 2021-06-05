import { RefObject, useEffect } from 'react'

export interface FeatureClickOutsideOptions {
  disable?: boolean
  /**
   * 点击了元素区域外（此事件必须冒泡到document）
   */
  onClickOutside?: (ev: { el: HTMLElement; nativeEvent: MouseEvent }) => void
}

export default function useFeatureClickOutside(
  domRef: RefObject<HTMLElement>,
  { disable = false, onClickOutside }: FeatureClickOutsideOptions
) {
  useEffect(() => {
    if (disable || !onClickOutside) return
    const WhenClickOutside = (e: MouseEvent) => {
      const paths = e.composedPath()
      if (!paths.includes(domRef.current!)) {
        onClickOutside({ el: domRef.current!, nativeEvent: e })
      }
    }
    document.addEventListener('click', WhenClickOutside, { passive: true })
    return () => document.removeEventListener('click', WhenClickOutside)
  }, [disable, onClickOutside])
}
