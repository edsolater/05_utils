/** @jsx jsx */
import { jsx } from '@emotion/react'
import { CSSProperties } from 'react'
import { toCss } from 'style/cssMixins'
import { ICSS } from 'style/cssType'
import { IRefs, mergeRefs } from 'baseUI/__Div/mergeRefs'
import { ClassName, classname } from './classname'

// 设立BaseProps是为了给其他baseUI如Img用的
export interface BaseProps<El = HTMLElement> {
  domRef?: IRefs<El>
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
}
// interface 会开启typescript的缓存机制
export interface DivProps<T extends keyof JSX.IntrinsicElements = 'div'>
  extends Omit<JSX.IntrinsicElements['div' /* TODO */], 'style' | 'css' | 'className'>,
    BaseProps {
  _tagName?: T //只能由baseUI组件调用）
}
export const allPropsName: ReadonlyArray<keyof DivProps> = ['css', 'style']

const Div = <T extends keyof JSX.IntrinsicElements = 'div'>({
  _tagName,
  className,
  css,
  style,
  domRef,
  ...restProps
}: DivProps<T>) => {
  const allProps: JSX.IntrinsicElements[T] = {
    ...restProps,
    className: classname(className),
    ref: mergeRefs(domRef),
    style,
    // @ts-expect-error
    css: toCss(css)
  }
  return jsx(_tagName ?? 'div', allProps)
}

export default Div
