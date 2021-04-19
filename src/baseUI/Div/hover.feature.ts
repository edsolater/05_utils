import { RefObject, useEffect } from 'react'
export interface FeatureProps {
  onHoverStart?: ({ el: HTMLElement }) => void
  onHoverEnd?: ({ el: HTMLElement }) => void
}
export const featureProps = ['onHoverStart', 'onHoverEnd'] as const
export function useFeature(
  { onHoverStart, onHoverEnd }: FeatureProps,
  { component }: { component: RefObject<HTMLElement | undefined> }
) {
  if (onHoverStart) {
    useEffect(() => {
      component.current!.addEventListener('pointerenter', (e) =>
        onHoverStart?.({ el: component.current! })
      )
    }, [])
  }
  if (onHoverEnd) {
    useEffect(() => {
      component.current!.addEventListener('pointerleave', (e) =>
        onHoverEnd?.({ el: component.current! })
      )
      component.current!.addEventListener('pointercancel', (e) =>
        onHoverEnd?.({ el: component.current! })
      )
    }, [])
  }
}
