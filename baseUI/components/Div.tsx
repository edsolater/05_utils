import  { createElement, CSSProperties, Fragment, ReactNode } from 'react'
import { useRef } from 'react'
import { parseICSS } from '../style/cssParser'
import { ICSS } from '../style/ICSS'
import classname, { ClassName } from '../functions/classname'
import useFeatureHover, { FeatureHoverOptions } from '../hooks/useFeatureHover'
import mergeRefs, { IRefs } from '../functions/mergeRefs'
import { MayDeepArray } from 'typings/tools'
import useClick, { UseClickOptions } from '../hooks/useClick'

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

// 设立BaseProps是为了给其他baseUI如Img用的
export interface DivProps<TagName extends keyof TagMap = 'div'> {
  // 只能低层组件使用
  as?: TagName

  domRef?: IRefs<TagMap[TagName]>
  isFragment?: boolean // 该节点的行为，就像 React.Fragnment
  css?: ICSS
  className?: MayDeepArray<ClassName>
  style?: CSSProperties
  htmlProps?: JSX.IntrinsicElements[TagName]
  onHover?: FeatureHoverOptions<TagMap[TagName]>['onHover']
  onClick?: UseClickOptions<TagMap[TagName]>['onClick']

  children?: ReactNode
}

export const divProps: ReadonlyArray<keyof DivProps> = [
  'as',
  'domRef',
  'isFragment',
  'className',
  'css',
  'children',
  'htmlProps',
  'onHover',
  'onClick'
] // TEMP
export const Div = <TagName extends keyof TagMap = 'div'>(props: DivProps<TagName>) => {
  const divRef = useRef<TagMap[TagName]>(null)
  useClick<TagMap[TagName]>(divRef, { onClick: props.onClick })
  useFeatureHover(divRef, { onHover: props.onHover })
  if (props.isFragment) return createElement(Fragment, { children: props.children })
  const allProps = {
    ...props.htmlProps,
    children: props.children,
    className: classname(props.className) + parseICSS(props.css),
    ref: mergeRefs(props.domRef, divRef),
    style: props.style
  }
  return createElement(props.as ?? 'div', allProps)
}

export default Div
