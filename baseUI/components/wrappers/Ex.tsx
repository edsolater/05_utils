import { mergeProps } from 'baseUI/functions'
import mapChildren from 'baseUI/functions/mapChildren'
import { ICSS } from 'baseUI/style/ICSS'
import React, { MutableRefObject, ReactNode } from 'react'
import { omit } from 'utils/functions/object'
import { AttachAnimateInjectProps } from './AttachAnimate'
import { AttachClickableInjectProps } from './AttachClickable'
import { AttachHoveableInjectProps } from './AttachHoverable'

export interface ExProps
  extends AttachClickableInjectProps,
    AttachHoveableInjectProps,
    AttachAnimateInjectProps {
  children?: ReactNode
  css?: ICSS // DECISION: should use atomic jss instead of tailwindCSS
  domRef?: MutableRefObject<any>
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
