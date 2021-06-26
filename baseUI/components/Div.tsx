import React, {
  createElement,
  CSSProperties,
  FC,
  ReactNode
} from 'react'
import { useRef } from 'react'
import { parseICSS } from '../style/cssParser'
import { ICSS } from '../style/ICSS'
import classname, { ClassName } from '../functions/classname'
import useFeatureHover, { FeatureHoverOptions } from '../hooks/useFeatureHover'
import mergeRefs, { IRefs } from '../functions/mergeRefs'
import { MayDeepArray } from 'typings/tools'
import useClick, { UseClickOptions } from '../hooks/useClick'
import { isString, isUndefined } from 'utils/functions/judgers'
import { omit } from 'utils/functions/object'

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

// TODO: as为组件时 的智能推断还不够好
export const Div = <TagName extends keyof TagMap = 'div'>(props: DivProps<TagName>) => {
  const divRef = useRef<TagMap[TagName]>(null)
  useClick<TagMap[TagName]>(divRef, { onClick: props.onClick })
  useFeatureHover(divRef, { onHover: props.onHover })

  return isUndefined(props.as) || isString(props.as)
    ? createElement(props.as ?? 'div', {
        ...props.htmlProps,
        children: props.children,
        className: classname(props.className) + parseICSS(props.css),
        ref: mergeRefs(props.domRef, divRef),
        style: props.style
      })
      // @ts-expect-error don't know why
    : createElement(props.as, omit(props, 'as'))
}

export default Div
