import { mergeProps } from 'baseUI/functions'
import React, { ReactNode } from 'react'
import Ex from './Ex'

export interface AttachForestedGlassProps {
  disable?: boolean
  theme?: '' | 'teal' | 'smoke' | 'lightsmoke'
  children?: ReactNode
}

export interface AttachForestedGlassInjectProps {
  className?: string
}

export const htmlAttributes = []

/**
 * @WrapperStyleComponent it will not render a true dom, but will inject className to component
 */
export default function AttachForestedGlass({ children, theme, disable, ...restProps }: AttachForestedGlassProps) {
  if (disable) return <>{children}</>
  return <Ex {...mergeProps(restProps, { className: `forseted-glass ${theme}` })}>{children}</Ex>
}
