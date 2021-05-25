import React, { FC } from 'react'
import Div, { DivProps } from 'baseUI/Div'
import { getCSS, CssProps } from './style'
import addDefault from 'utils/object/addDefault'

// TODO: 没写页面， 只是理论上，这样可以
export interface ViewControllerProps extends DivProps, CssProps {
  /**
   * 是否渲染
   * @default true
   */
  if?: boolean
}
const defaultProps: ViewControllerProps = {
  if: true
}

const _ViewController: FC<ViewControllerProps> = (props) => {
  addDefault(props, defaultProps)

  return props.if ? <Div css={getCSS(props)}>{props.children}</Div> : null
}

export default _ViewController
