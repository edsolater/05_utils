import { addDefaultProps, mergeProps } from 'baseUI/functions'
import React, { ComponentProps, FC, ReactNode } from 'react'
import { DivProps, WrapperProps } from '../baseProps'
import mapChildren from '../../functions/mapChildren'
import { parseIRefsWrapper } from 'baseUI/functions/parseRefs'
import { IRefs } from 'baseUI/functions/mergeRefs'
import useCallbackRef from 'baseUI/hooks/useCallbackRef'
import { omit, splitObject } from 'utils/functions/object'
import { objectMapKey } from 'utils/functions/object/objectMap'
import { toCamelCase } from 'utils/functions/string/changeCase'
import { useAppSettings } from '../AppSettings'

type AllProps = WrapperProps & DivProps
type ExProps = {
  domRef?: IRefs<HTMLElement>
  ex?: AllProps[]
  original?: AllProps
  children?: ReactNode
}
export interface VerboseProps extends AllProps, ExProps {}

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
export default function Ex({ children, ex, domRef, original, ...restProps }: VerboseProps) {
  return mapChildren(children, (child, idx) =>
    React.cloneElement(child, {
      original: original,
      ex: (ex ?? []).concat(restProps),
      domRef: useCallbackRef((dom) =>
        parseIRefsWrapper(domRef, (ref) => ((ref.current ??= [])[idx] = dom))
      )
    })
  )
}

/**
 * HOC
 *
 * will merged ex WrapperProps automaticly.
 * IDEA: can i auto wrap this function to first UIComponent? too tedious I think.
 *
 * @param Component the source Component defination function
 * @param defaultProps (optional)
 * @returns a new component that will digest appSetting then pass the merged props to original component.
 */
export function parseEx<C extends FC>(Component: C): C {
  const ParsedEx = ({ children, ex = [], original, domRef }: ExProps) =>
    React.createElement(
      Component,
      // @ts-expect-error exProps isn't tuple, so typescript will report an error
      mergeProps(original, ...ex, { domRef }),
      children
    )
  // @ts-expect-error HOC need to be no-effect
  return ParsedEx
}
