import { mergeProps } from 'baseUI/functions'
import { ICSS } from 'baseUI/style/ICSS'
import React, { ReactNode } from 'react'
import DomRef from './DomRef'

/**
 * @WrapperComponent
 *
 * 这是个透明组件，作用是在其上设定的CSS属性，“下沉”到子节点的CSSProps
 */
const CSS = ({ children, exCSS, ...restProps }: { children?: ReactNode; exCSS?: ICSS }) => {
  return <DomRef {...mergeProps(restProps, { css: exCSS })}>{children}</DomRef>
}

export default CSS
