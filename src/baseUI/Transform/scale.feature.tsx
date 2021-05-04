import attachGestureScale from 'helper/manageEvent/attachGestureScale'
import { mixCSSObjects } from 'style/cssParser'
import { attachWheel } from 'helper/attachEventHandler'
import { RefObject, useEffect, useMemo } from 'react'
import { setCSSVariable } from 'style/cssVaraiable'
import { cssVar } from 'style/cssFunctions'

/**
 * props定义声明
 */
export interface FeatureProps {
  /* ---------------------------------- 大小变化（） ---------------------------------- */
  /**会放大缩小，但只是影响试图 */
  scalable?: boolean
  /**能靠鼠标滚轮缩放 */
  canScaleByWheel?: boolean
  /**滚轮缩放的倍数（很小，小数点后3位才有效） */
  scaleWheelSpeed?: number
}

/**
 * props的字符串们
 */
export const featureProps: (keyof FeatureProps)[] = [
  'scalable',
  'canScaleByWheel',
  'scaleWheelSpeed'
]

/** @mutable 具体实现  */
export function useFeatureScale(
  component: RefObject<HTMLDivElement | undefined>,
  { scalable = false, canScaleByWheel = scalable, scaleWheelSpeed = 0.001 }: FeatureProps
) {
  useEffect(() => {
    if (scalable) {
      const el = component.current!
      attachGestureScale(el, {
        moving: (_, delta) => setCSSVariable(el, '--scale', delta.scaleRate)
      })
      if (canScaleByWheel) {
        attachWheel(el, (_, deltaY) =>
          setCSSVariable(
            el,
            '--scale',
            (old) => (1 + deltaY * scaleWheelSpeed) * Number(old === '' ? 1 : old)
          )
        )
      }
    }
  }, [])
  const css = useMemo(() => mixCSSObjects({ scale: `${scalable ? cssVar('--scale', 1) : ''}` }), [
    scalable
  ])
  return { css }
}
