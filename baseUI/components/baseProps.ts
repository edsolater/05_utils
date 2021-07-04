import React, { CSSProperties, FC, ReactNode } from 'react'
import { ICSS } from '../style/ICSS'
import { ClassName } from '../functions/classname'
import { IRefs } from '../functions/mergeRefs'
import { MayDeepArray } from 'typings/tools'

/**
 * 能在wrapper中流通的props
 * 因为你无法准确得知wrapper下的Component的props来源， WrapperComponent的类型一定是不完美的
 */
export interface WrapperProps {
  /**
   * 状态开关 。 一般用于 <Button> <Modal> 等需要开关的组件
   */
  open?: boolean
  /**
   * 是否处于 hover 状态，由 <Hoverable> 传递
   * 一些交互组件，如 `<Button>` 应该天然 对 hover 做出反应
   */
  isHovered?: boolean
  /**
   * 是否处于 active 状态，由 <Clickable> 传递
   * 一些交互组件，如 `<Button>` 应该天然 对 active 做出反应
   */
  isActive?: boolean
}

export interface DivProps<TagName extends keyof TagMap = 'div'> {
  // 只能低层组件使用
  as?: TagName | FC | typeof React.Fragment
  domRef?: IRefs<HTMLElement>
  css?: ICSS
  className?: MayDeepArray<ClassName>
  style?: CSSProperties
  htmlProps?: JSX.IntrinsicElements[TagName]
  children?: ReactNode
}

/**
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
