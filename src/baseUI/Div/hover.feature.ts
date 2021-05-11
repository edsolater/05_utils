import { useEffect } from 'react'
import { DivProps } from '.'
import { TagMap } from './TagMap'
export interface FeatureProps {
  onHoverStart?: ({ el, nativeEvent }: { el: HTMLElement; nativeEvent: PointerEvent }) => void
  onHoverEnd?: ({ el, nativeEvent }: { el: HTMLElement; nativeEvent: PointerEvent }) => void
}
export const featureProps = ['onHoverStart', 'onHoverEnd'] as const
export function useFeature<TagName extends keyof TagMap = 'div'>(
  props: DivProps<TagName>,
  { domRef }: { domRef: React.MutableRefObject<TagMap[TagName] | undefined> }
) {
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
}
