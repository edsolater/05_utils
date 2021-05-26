import React, { FC } from 'react'
import Div, { DivProps } from 'baseUI/Div'
import { getCSS, CssProps } from './style'

// TODO: 没写页面， 只是理论上，这样可以
// TODO： 只是占位，用于处理多Context的情况
export interface AppProvidersProps extends DivProps, CssProps {
  /**
   * 是否渲染
   * @default true
   */
  if?: boolean
}

const _AppProviders: FC<AppProvidersProps> = (props) => {
  const { if: ifExist = true } = props

  return ifExist ? <Div css={getCSS(props)}>{props.children}</Div> : null
}

export default _AppProviders
