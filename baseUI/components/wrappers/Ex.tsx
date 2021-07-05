import { mergeProps } from 'baseUI/functions'
import React from 'react'
import { parseIRefsWrapper } from 'baseUI/functions/parseRefs'
import useCallbackRef from 'baseUI/hooks/useCallbackRef'
import { splitObject } from 'utils/functions/object'
import { objectMapByKey } from 'utils/functions/object/objectMap'
import { toCamelCase } from 'utils/functions/string/changeCase'
import mapChildren from 'baseUI/functions/mapChildren'
import { DivProps } from '../Div'
import { AnimateInjectProps } from './Animate'
import { HoveableInjectProps } from './Hoverable'
import { ClickableInjectProps } from './Clickable'

export interface VerboseProps
  extends DivProps,
    AnimateInjectProps,
    HoveableInjectProps,
    ClickableInjectProps {}

/**
 * @WrapperComponent  this <Ex> is this the base of other wrapperComponents
 *
 * ex 前缀是为了规避同props自动覆盖的问题（JavaScript语言规定）
 *
 * @example
 * <Ex exOnClick={() => console.log(3)}>
 *   <Div />
 * </Ex>
 */
export default function Ex({ children, domRef, ...restProps }: VerboseProps) {
  return mapChildren(children, (child, idx) =>
    React.cloneElement(
      child,
      mergeProps(
        restProps,
        {
          domRef: useCallbackRef((dom) =>
            parseIRefsWrapper(domRef, (ref) => ((ref.current ??= [])[idx] = dom))
          )
        },
        child.props
      )
    )
  )
}
