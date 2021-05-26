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

const _ViewController: FC<ViewControllerProps> = (props) => {
  const { if: ifExist = true } = props

  return ifExist ? <Div css={getCSS(props)}>{props.children}</Div> : null
}

export default _ViewController