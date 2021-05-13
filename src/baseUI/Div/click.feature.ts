import { useEffect } from 'react'
import { DivProps } from '.'
import { TagMap } from './TagMap'

/**
 * props定义声明
 */
export interface FeatureProps<TagName extends keyof TagMap = 'div'> {
  /**
   * 就是普通的onClick
   */
  onClick?: ({ el, nativeEvent }: { el: TagMap[TagName]; nativeEvent: MouseEvent }) => void
  /**
   * 点击了元素区域外（此事件必须冒泡到document）
   */
  onClickOutside?: ({ el, nativeEvent }: { el: TagMap[TagName]; nativeEvent: MouseEvent }) => void
}
export const featureProps = ['onClick', 'onClickOutside'] as const

/** @mutable 具体实现  */
export function useFeature<TagName extends keyof TagMap = 'div'>(
  props: DivProps<TagName>,
  { domRef }: { domRef: React.MutableRefObject<TagMap[TagName] | undefined> }
) {
  if (props.onClick) {
    useEffect(() => {
      const whenClickInside = (e: MouseEvent) =>
        props.onClick?.({ el: domRef.current!, nativeEvent: e })
      //@ts-ignore
      domRef.current!.addEventListener('click', whenClickInside)
    }, [])
  }
  if (props.onClickOutside) {
    useEffect(() => {
      const WhenClickOutside = (e: MouseEvent) => {
        const paths = e.composedPath()
        if (!paths.includes(domRef.current!)) {
          props.onClickOutside?.({ el: domRef.current!, nativeEvent: e })
        }
      }
      document.addEventListener('click', WhenClickOutside, { passive: true })
      return () => document.removeEventListener('click', WhenClickOutside)
    }, [])
  }
}
