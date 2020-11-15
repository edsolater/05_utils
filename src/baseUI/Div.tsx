/** @jsx jsx */
import { jsx, css, Interpolation } from '@emotion/core'
import { forwardRef, ForwardRefRenderFunction } from 'react'
import { MayArray } from 'typings/tools'
export type DivProps = {
  disabled?: boolean
  /**
   * 专门用于放css variable的
   */
  css?: MayArray<Interpolation>
  /**
   * 强制使用disabled的样式
   */
  cssVaraible?: {
    /**
     * 给translate的，表示在x轴偏移的方向
     */
    '--x'?: number
    /**
     * 给translate的，表示在y轴偏移的方向
     */
    '--y'?: number
    [variableName: string]: number | string | undefined
  } // TODO
}
export const allPropsName: ReadonlyArray<keyof DivProps> = ['css', 'disabled', 'cssVaraible']

const Div: ForwardRefRenderFunction<any, Omit<JSX.IntrinsicElements['div'], 'style'> & DivProps> = (
  { disabled, css: emotionCss, cssVaraible = {}, children, ...restProps },
  ref
) => (
  <div
    ref={ref}
    //@ts-expect-error 因为 css variable 势必造成不匹配的问题
    style={{ ...(disabled && { opacity: '.3', cursor: 'not-allowed' }), ...cssVaraible }}
    css={css(emotionCss)}
    {...restProps}
  >
    {children}
  </div>
)

export default forwardRef(Div)
