import React, { FC } from 'react'
import Div, { DivProps } from 'baseUI/Div'
import { getCSS, CssProps } from './style'

// TODO: 没写页面， 只是理论上，这样可以
export interface ViewControllerProps extends DivProps, CssProps {
  /**
   * 是否渲染
   * @default true
   */
  if?: boolean
}

const _ViewController: FC<ViewControllerProps> = (props) => {
  const { if: ifExist = true } = props

  return ifExist ? <Div css={getCSS(props)}>{props.children}</Div> : null
}

export default _ViewController
