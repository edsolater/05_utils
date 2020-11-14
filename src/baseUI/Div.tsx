/** @jsx jsx */
import { jsx, css, Interpolation } from '@emotion/core'
import { forwardRef, ForwardRefRenderFunction } from 'react'
import { MayArray } from 'typings/tools'

export type DivProps = {
  css?: MayArray<Interpolation>
  /**
   * 强制使用disabled的样式
   */
  disabled?: boolean
}
export const allPropsName = ['css', 'disabled'] as ReadonlyArray<keyof DivProps>
/**
 * 在`<div>`之上提供 emotion 的 css 属性
 */
const Div: ForwardRefRenderFunction<any, Omit<JSX.IntrinsicElements['div'], 'style'> & DivProps> = (
  { disabled, css: emotionCss, children, ...restProps },
  ref
) => (
  <div
    ref={ref}
    style={{ ...(disabled && { opacity: '.3', cursor: 'not-allowed' }) }}
    css={css(emotionCss)}
    {...restProps}
  >
    {children}
  </div>
)

export default forwardRef(Div)
