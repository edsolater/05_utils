/** @jsx jsx */
import { jsx } from '@emotion/react'
import { CSSProperties } from 'react'
import { toCss } from 'style/cssMixins'
import { ICSS } from 'style/cssType'
import { IFC } from 'typings/reactType'
import { mergeRefs } from 'helper/reactHelper/mergeRefs'
export interface DivProps extends Omit<JSX.IntrinsicElements['div'], 'style' | 'css'> {
  // 这会开启typescript的缓存机制
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
}
export const allPropsName: ReadonlyArray<keyof DivProps> = ['css', 'style']

const Div: IFC<DivProps> = ({
  css: emotionCss,
  style,
  children,
  domRef,
  ...restProps
}) => (
  <div
    ref={mergeRefs(domRef /* currentRef */)}
    //@ts-expect-error 因为有css variable 势必造成不匹配的问题
    style={style}
    css={toCss(emotionCss)}
    {...restProps}
  >
    {children}
  </div>
)

export default Div
