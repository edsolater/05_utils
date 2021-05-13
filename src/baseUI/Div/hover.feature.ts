import { useEffect } from 'react'
import { DivProps } from '.'
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
  props: DivProps<TagName>,
  { domRef }: { domRef: React.MutableRefObject<TagMap[TagName] | undefined> }
) {
  //#region ------------------- 感知 Hover 的开始与结束 -------------------
  if (props.onHoverStart) {
    useEffect(() => {
      domRef.current!.addEventListener('pointerenter', (e) =>
        props.onHoverStart?.({ el: domRef.current!, nativeEvent: e as PointerEvent })
      )
    }, [])
  }
  if (props.onHoverEnd) {
    useEffect(() => {
      domRef.current!.addEventListener('pointerleave', (e) =>
        props.onHoverEnd?.({ el: domRef.current!, nativeEvent: e as PointerEvent })
      )
      domRef.current!.addEventListener('pointercancel', (e) =>
        props.onHoverEnd?.({ el: domRef.current!, nativeEvent: e as PointerEvent })
      )
    }, [])
  }
  //#endregion
}
