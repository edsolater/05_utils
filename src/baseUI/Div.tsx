/** @jsx jsx */
import { jsx, css, Interpolation } from '@emotion/core'
import { forwardRef, ForwardRefRenderFunction } from 'react'
import { MayArray } from 'typings/tools'

export type DivProps = {
  css?: MayArray<Interpolation>
}
export const allPropsName: Readonly<Array<keyof DivProps>> = ['css'] as const
/**
 * 在`<div>`之上提供 emotion 的 css 属性
 */
const Div: ForwardRefRenderFunction<
  any,
  JSX.IntrinsicElements['div'] & { css?: Interpolation }
> = ({ css: emotionCss, children, ...restProps }, ref) => (
  <div ref={ref} css={css(emotionCss)} {...restProps}>
    {children}
  </div>
)

export default forwardRef(Div)
