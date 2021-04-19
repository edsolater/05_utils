import { RefObject, useEffect } from 'react'

/**
 * props定义声明
 */
export interface FeatureProps {
  onClick?: ({ el: HTMLElement }) => void
}
export const featureProps = ['onClick'] as const

/** @mutable 具体实现  */
export function useFeature(
  { onClick }: FeatureProps,
  { component }: { component: RefObject<HTMLElement | undefined> }
) {
  if (onClick) {
    useEffect(() => {
      component.current!.addEventListener('click', (e) => onClick({ el: component.current! }))
    }, [])
  }
}
