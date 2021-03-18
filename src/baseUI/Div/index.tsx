/** @jsx jsx */
import { jsx } from '@emotion/react'
import { CSSProperties, ReactNode, useCallback } from 'react'
import { toCss } from 'style/cssMixins'
import { ICSS } from 'style/cssType'
import { IRefs, mergeRefs } from 'baseUI/Div/mergeRefs'
import { ClassName, classname } from './classname'
import { attachFeatures, FeaturesProps } from './features'

// 设立BaseProps是为了给其他baseUI如Img用的
export interface DivProps extends FeaturesProps {
  domRef?: IRefs<HTMLElement>
  className?: ClassName
  // 对interface，typescript有缓存
  css?: ICSS
  /**
   * 在原来style的基础上，增加了对css variable的type类型的支持
   * 其实就是元素的style
   */
  style?:
    | CSSProperties
    | {
        // TODO：好像不应该写在这里
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
  children?: ReactNode
  originalReactProps?: JSX.IntrinsicElements['div']
}

const Div = ({ className, css, style, domRef, children, ...featureEvents }: DivProps) => {
  const attachFeatureCallback = useCallback((el) => attachFeatures(el, featureEvents), [])
  const allProps = {
    children,
    className: classname(className),
    ref: mergeRefs(domRef, attachFeatureCallback),
    style,
    css: toCss(css)
  }
  return jsx('div', allProps)
}

export default Div
