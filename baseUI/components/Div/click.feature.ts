import { useEffect } from 'react'
import { TagMap } from './TagMap'

/**
 * props定义声明
 */
export interface FeatureProps<TagName extends keyof TagMap = 'div'> {
  /**
   * 就是普通的onClick
   */
  onClick?: (ev: { el: TagMap[TagName]; nativeEvent: MouseEvent }) => void
  /**
   * 点击了元素区域外（此事件必须冒泡到document）
   */
  onClickOutside?: (ev: { el: TagMap[TagName]; nativeEvent: MouseEvent }) => void
}
export const featureProps = ['onClick', 'onClickOutside'] as const

/** @mutable 具体实现  */
export function useFeature<TagName extends keyof TagMap = 'div'>(
  { onClick, onClickOutside }: FeatureProps<TagName>,
  { domRef }: { domRef: React.MutableRefObject<TagMap[TagName] | undefined> }
) {
  useEffect(() => {
    if (onClick) {
      const whenClickInside = (e: Event) =>
        onClick?.({ el: domRef.current!, nativeEvent: e as MouseEvent })
      domRef.current!.addEventListener('click', whenClickInside, { passive: true })
      return () => domRef.current!.removeEventListener('click', whenClickInside)
    }
  }, [onClick])

  useEffect(() => {
    if (onClickOutside) {
      const WhenClickOutside = (e: MouseEvent) => {
        const paths = e.composedPath()
        if (!paths.includes(domRef.current!)) {
          onClickOutside?.({ el: domRef.current!, nativeEvent: e })
        }
      }
      document.addEventListener('click', WhenClickOutside, { passive: true })
      return () => document.removeEventListener('click', WhenClickOutside)
    }
  }, [onClickOutside])
}