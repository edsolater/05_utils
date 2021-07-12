import { mergeProps } from 'baseUI/functions'
import React, { ReactNode } from 'react'
import Ex from './Ex'

export interface AttachCustomizedClassNameProps {
  customizedClassName?: string
  children?: ReactNode
}

export interface AttachCustomizedClassNameInjectProps {
  className?: string
}

export const htmlAttributes = []

/**
 * @WrapperStyleComponent it will not render a true dom, but will inject className to component
 */
export default function AttachCustomizedClassName({
  children,
  customizedClassName,
  ...restProps
}: AttachCustomizedClassNameProps) {
  return <Ex {...mergeProps(restProps, { className: customizedClassName })}>{children}</Ex>
}
