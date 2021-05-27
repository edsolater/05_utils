import { useEffect } from 'react'
import { TagMap } from './TagMap'

/**
 * props定义声明
 */
export interface FeatureProps<TagName extends keyof TagMap = 'div'> {
  /**
   * hover 开始（鼠标移入的瞬间）
   */
  onHoverStart?: ({ el, nativeEvent }: { el: TagMap[TagName]; nativeEvent: PointerEvent }) => void
  /**
   * hover 结束（鼠标移出/取消的瞬间）
   */
  onHoverEnd?: ({ el, nativeEvent }: { el: TagMap[TagName]; nativeEvent: PointerEvent }) => void
}
export const featureProps = ['onHoverStart', 'onHoverEnd'] as const

/** @mutable 具体实现  */
export function useFeature<TagName extends keyof TagMap = 'div'>(
  { onHoverStart, onHoverEnd }: FeatureProps<TagName>,
  { domRef }: { domRef: React.MutableRefObject<TagMap[TagName] | undefined> }
) {
  useEffect(() => {
    if (onHoverStart) {
      domRef.current!.addEventListener('pointerenter', (e) =>
        onHoverStart?.({ el: domRef.current!, nativeEvent: e as PointerEvent })
      )
    }
  }, [onHoverStart])

  useEffect(() => {
    if (onHoverEnd) {
      domRef.current!.addEventListener('pointerleave', (e) =>
        onHoverEnd?.({ el: domRef.current!, nativeEvent: e as PointerEvent })
      )
      domRef.current!.addEventListener('pointercancel', (e) =>
        onHoverEnd?.({ el: domRef.current!, nativeEvent: e as PointerEvent })
      )
    }
  }, [onHoverEnd])
}
