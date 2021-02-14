import Div, { DivProps } from './Div'
import React, { CSSProperties } from 'react'
const debugModeColor = 'gray'

export interface ButtonProps extends DivProps {
  inDebugMode?: boolean
  src?: string
  size?: CSSProperties['width']
  color?: CSSProperties['backgroundColor']
}

/**
 * 普通Button，TODO
 */
const Button = ({
  inDebugMode = false,
  size = 40,
  color = debugModeColor,
  src,
  ...restProps
}: ButtonProps) => {
  return (
    <Div
      _baseProps={restProps}
      css={[
        {
          width: size,
          height: size,
          borderRadius: '50%',
          backgroundColor: inDebugMode ? debugModeColor : color
        },
        restProps.css
      ]}
    ></Div>
  )
}

export default Button
