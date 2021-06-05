import { jsx } from '@emotion/react'
import { useRef } from 'react'
import { parseCSS } from '../../style/cssParser'
import { ICSS } from '../../style/ICSS'
import { ClassName, classname } from './util/classname'
import { useFeatureHover, FeatureHoverOptions } from '../../hooks/useFeatureHover'
import { IRefs, mergeRefs } from './util/mergeRefs'
import { ReactProps } from 'typings/constants'
import { TagMap } from './TagMap'
import { MayDeepArray } from 'typings/tools'
import useEventClick, { ListenerClickOptions } from 'baseUI/hooks/useEventClick'
export { default as BaseUIDiv } from './BaseUIDiv'

// 设立BaseProps是为了给其他baseUI如Img用的
export interface DivProps<TagName extends keyof TagMap = 'div'> extends ReactProps {
  // 只能低层组件使用
  as?: TagName

  domRef?: IRefs<TagMap[TagName]>
  css?: ICSS
  className?: MayDeepArray<ClassName>
  htmlProps?: JSX.IntrinsicElements[TagName]
  onHover?: FeatureHoverOptions['onHover']
  onClick?: ListenerClickOptions['onClick']
}

export const divProps: ReadonlyArray<keyof DivProps> = [
  'as',
  'domRef',
  'className',
  'css',
  'children',
  'htmlProps',
  'onHover',
  'onClick'
]
export const Div = <TagName extends keyof TagMap = 'div'>(props: DivProps<TagName>) => {
  const divRef = useRef<TagMap[TagName]>(null)
  useEventClick(divRef, { onClick: props.onClick })
  useFeatureHover(divRef, { onHover: props.onHover })
  const allProps = {
    ...props.htmlProps,
    children: props.children,
    className: classname(props.className),
    ref: mergeRefs(props.domRef, divRef),
    css: parseCSS(props.css)
  }
  return jsx(props.as ?? 'div', allProps)
}

export default Div
