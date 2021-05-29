import React, { FC } from 'react'
import Div, { DivProps } from 'baseUI/Div'
import { getCSS, CssProps } from './style'

export interface ViewControllerProps extends DivProps, CssProps {
  /**
   * 是否渲染子元素
   * @default true
   */
  if?: boolean
}
/**
 * @SideEffectComponent
 * 
 * 不一定会在HTML中体现，肯定不会在DOM树中，因为 display:contents 了
 * 能控制子组件的渲染与否
 */
const ViewController: FC<ViewControllerProps> = (props) => {
  const { if: ifExist = true } = props

  return ifExist ? <Div css={getCSS(props)}>{props.children}</Div> : null
}

export default ViewController
