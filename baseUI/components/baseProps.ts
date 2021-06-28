import React, { CSSProperties, FC, ReactNode } from 'react'
import { ICSS } from '../style/ICSS'
import { ClassName } from '../functions/classname'
import { FeatureHoverOptions } from '../hooks/useFeatureHover'
import { IRefs } from '../functions/mergeRefs'
import { MayDeepArray } from 'typings/tools'
import { UseClickOptions } from '../hooks/useClick'

export interface WrapperProps {
  /**
   * 状态开关 。 一般用于 <Button> <Modal> 等需要开关的组件
   */
  open?: boolean
}

export interface DivProps<TagName extends keyof TagMap = 'div'> {
  // 只能低层组件使用
  as?: TagName | FC | typeof React.Fragment
  domRef?: IRefs<TagMap[TagName]>
  css?: ICSS
  className?: MayDeepArray<ClassName>
  style?: CSSProperties
  htmlProps?: JSX.IntrinsicElements[TagName]
  onHover?: FeatureHoverOptions<TagMap[TagName]>['onHover']
  onClick?: UseClickOptions<TagMap[TagName]>['onClick']
  children?: ReactNode
}

/**
 *
 * 这个纯粹是 tag名 与相应的 HTMLElement 转换
 */
export interface TagMap {
  div: HTMLDivElement
  main: HTMLDivElement

  button: HTMLButtonElement
  img: HTMLImageElement
  input: HTMLInputElement
  textarea: HTMLTextAreaElement
  video: HTMLVideoElement
}
