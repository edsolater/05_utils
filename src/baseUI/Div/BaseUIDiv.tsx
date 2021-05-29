import React from 'react'
import { ICSS } from 'style/ICSS'
import { ClassName } from './util/classname'
import { TagMap } from './TagMap'
import { IRefs } from './util/mergeRefs'
import { mergeDeepObject } from 'utils/merge'
import { DivProps, Div } from './index'

/**
 * 基础组件专用Div，其  _props 会自动 merge
 */

export interface BaseUIDivProps<TagName extends keyof TagMap = 'div'> extends DivProps<TagName> {
  _domRef?: IRefs<TagMap[TagName]>
  _className?: ClassName
  _css?: ICSS
  _htmlProps?: JSX.IntrinsicElements[TagName]
}
/**
 * 基础组件专用Div，_props 会自动合并到props上
 */

export default function BaseUIDiv<TagName extends keyof TagMap = 'div'>(
  props: BaseUIDivProps<TagName>
) {
  return (
    <Div
      as={props.as}
      children={props.children}
      className={[props._className, props.className] /* why toString() because emotion add name*/}
      domRef={[props._domRef]}
      css={[props._css, props.css]}
      htmlProps={mergeDeepObject([props._htmlProps, props.htmlProps])}
    />
  )
}
