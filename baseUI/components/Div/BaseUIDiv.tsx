import React from 'react'
import { TagMap } from './TagMap'
import { DivProps, Div } from './index'
import mergeProps from 'baseUI/functions/mergeProps'

/**
 * 基础组件专用Div，其  _props 会自动 merge
 */

export interface BaseUIDivProps<TagName extends keyof TagMap = 'div'> extends DivProps<TagName> {
  _domRef?: DivProps<TagName>['domRef']
  _className?: DivProps<TagName>['className']
  _css?: DivProps<TagName>['css']
  _onHover?: DivProps<TagName>['onHover']
  _onClick?: DivProps<TagName>['onClick']
  _htmlProps?: DivProps<TagName>['htmlProps']
}
/**
 * 基础组件专用Div，_props 会自动合并到props上
 */

export default function BaseUIDiv<TagName extends keyof TagMap = 'div'>(
  props: BaseUIDivProps<TagName>
) {
  return (
    <Div
      {...props}
      as={props.as}
      children={props.children}
      className={[props._className, props.className]}
      domRef={[props._domRef, props.domRef]}
      css={[props._css, props.css]}
      onClick={(...params) => {
        props._onClick?.(...params)
        props.onClick?.(...params)
      }}
      onHover={(...params) => {
        props._onHover?.(...params)
        props.onHover?.(...params)
      }}
      htmlProps={mergeProps(props._htmlProps, props.htmlProps)}
    />
  )
}
