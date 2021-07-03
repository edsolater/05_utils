import { mergeProps } from 'baseUI/functions'
import { ICSS } from 'baseUI/style/ICSS'
import React, { ReactNode } from 'react'
import Ex from './Ex'

/**
 * @WrapperComponent
 *
 * 这是个透明组件，作用是在其上设定的CSS属性，“下沉”到子节点的CSSProps
 * 为什么需要ex开头，而不是直接写？ 因为不确定上层组件props是否能被识别成css
 */
const CSS = ({ children, exCSS, ...restProps }: { children?: ReactNode; exCSS?: ICSS }) => {
  return <Ex {...mergeProps(restProps, { css: exCSS })}>{children}</Ex>
}

export default CSS
