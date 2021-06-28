import React from 'react'
import { Div } from './Div'
import { TagMap, DivProps } from './baseProps'
import { mergeProps } from '../functions'

/**
 * 基础组件专用版<Div>，其  _props 会自动 merge
 */

export interface BaseUIDivProps<TagName extends keyof TagMap = 'div'> extends DivProps<TagName> {
  _domRef?: DivProps<TagName>['domRef']
  _className?: DivProps<TagName>['className']
  _css?: DivProps<TagName>['css']
  _onHover?: DivProps<TagName>['onHover']
  _onClick?: DivProps<TagName>['onClick']
  _htmlProps?: DivProps<TagName>['htmlProps']
  _style?: DivProps<TagName>['style']
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
      {...mergeProps<BaseUIDivProps<TagName>>(
        {
          className: props._className,
          domRef: props._domRef,
          css: props._css,
          style: props.style,
          onClick: props._onClick,
          onHover: props._onHover,
          htmlProps: props._htmlProps
        },
        props
      )}
    />
  )
}
