/** @jsx jsx */
import { jsx } from '@emotion/react'
import { CSSProperties, ReactNode, useCallback } from 'react'
import { parseCSS } from 'style/cssParser'
import { ICSS } from 'style/ICSS'
import { ClassName, classname } from './util/classname'
import { attachFeatures, featureProps, FeaturesProps } from './feature'
import { TagMap } from './TagMap'
import { IRefs, mergeRefs } from './util/mergeRefs'
import merge from 'utils/array/merge'

// 设立BaseProps是为了给其他baseUI如Img用的
export interface DivProps<TagName extends keyof TagMap = 'div'> extends FeaturesProps {
  // 只能低层组件使用
  _tagName?: TagName
  domRef?: IRefs<TagMap[TagName] | undefined>
  className?: ClassName
  // 对interface，typescript有缓存
  css?: ICSS
  /**
   * 在原来style的基础上，增加了对css variable的type类型的支持
   * 其实就是元素的style
   */
  style?: CSSProperties | { [cssVariableName: string]: number | string | undefined }
  children?: ReactNode
  htmlProps?: JSX.IntrinsicElements[TagName]
}
export const divProps: ReadonlyArray<keyof DivProps> = merge([
  '_tagName',
  'domRef',
  'className',
  'css',
  'style',
  'children',
  'htmlProps'
], featureProps)
const Div = <TagName extends keyof TagMap = 'div'>(props: DivProps<TagName>) => {
  const attachFeatureCallback = useCallback((el) => attachFeatures(el, props), [props])
  const allProps = {
    ...props.htmlProps,
    children: props.children,
    style: props.style,
    className: classname(props.className),
    ref: mergeRefs(props.domRef, attachFeatureCallback),
    css: parseCSS(props.css)
  }
  return jsx(props._tagName ?? 'div', allProps)
}

export default Div
