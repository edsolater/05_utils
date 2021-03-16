/** @jsx jsx */
import { jsx } from '@emotion/react'
import { CSSProperties, ReactNode } from 'react'
import { toCss } from 'style/cssMixins'
import { ICSS } from 'style/cssType'
import { IRef } from 'typings/reactType'
import { mergeRefs } from 'helper/reactHelper/mergeRefs'
import { ClassName, classname } from './classname'

// 设立BaseProps是为了给其他baseUI如Img用的
export interface BaseProps {
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
  domRef?: IRef<HTMLElement>
  // 就是个为了编写props方便而设立的，优先级比直接定义的低（只能由baseUI组件调用）
  _baseProps?: BaseProps
}
// interface 会开启typescript的缓存机制
export interface DivProps<T extends keyof JSX.IntrinsicElements = 'div'>
  extends Omit<JSX.IntrinsicElements['div' /* TODO */], 'style' | 'css' | 'className'>,
    BaseProps {
  _tagName?: T //只能由baseUI组件调用）
  children?: ReactNode
}
export const allPropsName: ReadonlyArray<keyof DivProps> = ['css', 'style']

const Div = <T extends keyof JSX.IntrinsicElements = 'div'>({
  _tagName,
  className: incomeClassname,
  css: emotionCss,
  style,
  domRef,
  _baseProps: baseProps, 
  ...restProps
}: DivProps<T>) => {
  const allProps: JSX.IntrinsicElements[T] = {
    ...baseProps,
    ...restProps,
    className: classname(incomeClassname),
    ref: mergeRefs(baseProps?.domRef, domRef),
    style: { ...baseProps?.style, ...style },
    // @ts-expect-error
    css: toCss([baseProps?.css, emotionCss])
  }
  return jsx(_tagName ?? 'div', allProps)
}

export default Div
