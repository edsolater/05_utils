import { RefObject, useEffect } from 'react'

/**
 * props定义声明
 */
export interface FeatureProps {
  onClick?: ({ el: HTMLElement }) => void
  onClickOutside?: ({ el: HTMLElement }) => void
}
export const featureProps = ['onClick', 'onClickOutside'] as const

/** @mutable 具体实现  */
export function useFeature(
  { onClick, onClickOutside }: FeatureProps,
  { component }: { component: RefObject<HTMLElement | undefined> }
) {
  if (onClick) {
    useEffect(() => {
      component.current!.addEventListener('click', (e) => onClick({ el: component.current! }))
    }, [])
  }
  if (onClickOutside) {
    useEffect(() => {
      document.addEventListener(
        'click',
        (e) => {
          const paths = e.composedPath()
          if (!paths.includes(component.current!)) {
            onClickOutside({ el: component.current! })
          }
        },
        { passive: true }
      )
    }, [])
  }
}
