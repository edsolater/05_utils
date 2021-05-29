import { jsx } from '@emotion/react'
import { useRef } from 'react'
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
import {
  useFeature as useFeatureResize,
  FeatureProps as FeatureResizeProps,
  featureProps as featureResizeProps
} from './resize.feature'
import { TagMap } from './TagMap'
import { IRefs, mergeRefs } from './util/mergeRefs'
import concat from 'utils/array/concat'
import { ReactProps } from 'typings/constants'
import { MayDeepArray } from 'typings/tools'
export { default as BaseUIDiv } from './BaseUIDiv'

// 设立BaseProps是为了给其他baseUI如Img用的
export interface DivProps<TagName extends keyof TagMap = 'div'>
  extends FeatureClickProps<TagName>,
    FeatureHoverProps<TagName>,
    FeatureResizeProps<TagName>,
    ReactProps {
  // 只能低层组件使用
  as?: TagName

  domRef?: IRefs<TagMap[TagName]>
  css?: ICSS
  className?: MayDeepArray<ClassName>
  htmlProps?: JSX.IntrinsicElements[TagName]
}

export const divProps: ReadonlyArray<keyof DivProps> = concat(
  ['as', 'domRef', 'className', 'css', 'children', 'htmlProps'],
  featureClickProps,
  featureHoverProps,
  featureResizeProps
)
export const Div = <TagName extends keyof TagMap = 'div'>(props: DivProps<TagName>) => {
  const divRef = useRef<TagMap[TagName]>()
  useFeatureClick<TagName>(props, { domRef: divRef })
  useFeatureHover<TagName>(props, { domRef: divRef })
  useFeatureResize<TagName>(props, { domRef: divRef })
  console.log('props.className: ', props.className, typeof props.className)
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
