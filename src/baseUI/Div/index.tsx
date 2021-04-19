/** @jsx jsx */
import { jsx } from '@emotion/react'
import { CSSProperties, ReactNode, useRef } from 'react'
import { parseCSS } from 'style/cssParser'
import { ICSS } from 'style/ICSS'
import { ClassName, classname } from './util/classname'
import {
  useFeature as useFeatureClick,
  FeatureProps as FeatureClickProps,
  featureProps as featureClickProps
} from './click.feature'
import {
  useFeature as useFeatureHover,
  FeatureProps as FeatureHoverProps,
  featureProps as featureHoverProps
} from './hover.feature'
import { TagMap } from './TagMap'
import { IRefs, mergeRefs } from './util/mergeRefs'
import merge from 'utils/array/merge'

// 设立BaseProps是为了给其他baseUI如Img用的
export interface DivProps<TagName extends keyof TagMap = 'div'>
  extends FeatureClickProps,
    FeatureHoverProps {
  // 只能低层组件使用
  _tagName?: TagName
  domRef?: IRefs<TagMap[TagName]>
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
export const divProps: ReadonlyArray<keyof DivProps> = merge(
  ['_tagName', 'domRef', 'className', 'css', 'style', 'children', 'htmlProps'],
  featureClickProps,
  featureHoverProps
)
const Div = <TagName extends keyof TagMap = 'div'>(props: DivProps<TagName>) => {
  const divRef = useRef<TagMap[TagName]>()
  useFeatureClick(props, { component: divRef })
  useFeatureHover(props, { component: divRef })
  const allProps = {
    ...props.htmlProps,
    children: props.children,
    style: props.style,
    className: classname(props.className),
    ref: mergeRefs(props.domRef, divRef),
    css: parseCSS(props.css)
  }
  return jsx(props._tagName ?? 'div', allProps)
}

export default Div
