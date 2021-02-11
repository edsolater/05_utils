/** @jsx jsx */
import { jsx } from '@emotion/react'
import { CSSProperties } from 'react'
import { toCss } from 'style/cssMixins'
import { ICSS } from 'style/cssType'
import { IRef } from 'typings/reactType'
import { mergeRefs } from 'helper/reactHelper/mergeRefs'
// interface 会开启typescript的缓存机制
export interface DivProps extends Omit<JSX.IntrinsicElements['div'], 'style' | 'css'> {
  // 就是个为了编写props方便而设立的，优先级比直接定义低
  handoffProps?: DivProps
  _tagName?: 'div' | 'button' | 'img' | (string & {}) //TODO Div 作为一个桥梁，应该能自定义tagName
  // 对interface，typescript有缓存
  css?: ICSS
  /**
   * 在原来style的基础上，增加了对css variable的type类型的支持
   * 其实就是元素的style
   */
  style?:
    | CSSProperties
    | {
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
  domRef?: IRef<HTMLDivElement>
}
export const allPropsName: ReadonlyArray<keyof DivProps> = ['css', 'style']

const Div = ({
  css: emotionCss,
  style,
  children,
  domRef,
  handoffProps,
  ...restProps
}: DivProps) => (
  <div
    {...{ ...handoffProps, ...restProps }}
    ref={mergeRefs(handoffProps?.domRef, domRef /* currentRef */)}
    //@ts-expect-error 因为有css variable 势必造成不匹配的问题
    style={{ ...handoffProps?.style, ...style }}
    css={toCss([handoffProps?.css, emotionCss])}
  >
    {children ?? handoffProps?.children}
  </div>
)

export default Div
