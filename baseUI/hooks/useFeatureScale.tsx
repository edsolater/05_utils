import { mixCSSObjects } from '../style/cssParser'
import { RefObject, useEffect, useMemo } from 'react'
import { setCSSVariable } from '../style/cssVaraiable'
import { cssVar } from '../style/cssFunctions'
import { attachWheel } from 'utils/helper/attachEventHandler'
import attachGestureScale from 'utils/helper/manageEvent/attachGestureScale'

/**
 * props定义声明
 */
export interface FeatureScaleOptions {
  /* ---------------------------------- 大小变化（不会重排） ---------------------------------- */
  /**会放大缩小，但只是影响试图 */
  disable?: boolean
  /**能靠鼠标滚轮缩放 */
  canScaleByWheel?: boolean
  /**滚轮缩放的倍数（很小，小数点后3位才有效） */
  scaleWheelSpeed?: number
}

export default function useFeatureScale(
  component: RefObject<HTMLDivElement | undefined>,
  { disable = true, canScaleByWheel = disable, scaleWheelSpeed = 0.001 }: FeatureScaleOptions = {}
) {
  useEffect(() => {
    if (disable) return

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
  }, [])
  const css = useMemo(() => mixCSSObjects({ scale: `${disable ? cssVar('--scale', 1) : ''}` }), [
    disable
  ])
  return { css }
}
