import Div, { DivProps } from './Div'
import React from 'react'
import { mix } from 'style/cssMixins'
import { cssBrightness } from 'style/cssFunctions'
const cssButton = () =>
  mix({
    appearance: 'none',
    cursor: 'pointer',
    userSelect: 'none',
    width: 'max-content',
    color: 'white',
    padding: '8px 16px',
    backgroundColor: '#333',
    ':hover': {
      filter: cssBrightness(1.4)
    },
    ':active': {
      filter: cssBrightness(0.6)
    }
  })

export interface ButtonProps extends DivProps {}

/**
 * 普通Button，TODO
 */
const Button = ({ ...restProps }: ButtonProps) => {
  return <Div {...restProps} css={mix(cssButton, restProps.css)}></Div>
}

export default Button
