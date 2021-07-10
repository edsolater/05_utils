import { mergeProps } from 'baseUI/functions'
import mapChildren from 'baseUI/functions/mapChildren'
import React, { MutableRefObject, ReactElement, ReactNode } from 'react'
import { omit } from 'utils/functions/object'
import { AttachClickableProps } from './AttachClickable'
import { AttachHoverableProps } from './AttachHoverable'

export interface ExProps extends AttachClickableProps, AttachHoverableProps {
  domRef?: MutableRefObject<any>
  children?: ReactNode
}

/**
 * @WrapperComponent  this <Ex> is this the base of other wrapperComponents
 * @example
 * <Ex exOnClick={() => console.log(3)}>
 *   <Div />
 * </Ex>
 */
export default function Ex({ children, domRef, ...restProps }: ExProps) {
  return mapChildren(children, (child) =>
    React.cloneElement(child, omit(mergeProps(restProps, { domRef }, child.props)))
  )
}

function isDom(child: ReactElement) {
  return typeof child.type === 'string'
}
