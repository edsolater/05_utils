import Div, { DivProps } from './Div'
import React from 'react'
import { mix } from 'style/cssMixins'
import { cssBrightness } from 'style/cssFunctions'
const cssButton = () =>
  mix({
    display: 'grid',
    placeContent: 'center',
    borderRadius: '100vw',
    appearance: 'none',
    borderWidth: 0,
    cursor: 'pointer',
    userSelect: 'none',
    width: 'max-content',
    color: 'white',
    padding: '8px 16px',
    backgroundColor: '#666',
    ':hover': {
      filter: cssBrightness(1.4)
    },
    ':active': {
      filter: cssBrightness(0.8)
    }
  })

export interface ButtonProps extends DivProps<'button'> {}

/**
 * 普通Button，TODO
 */
const Button = ({ ...restProps }: ButtonProps) => {
  return <Div _tagName='button' {...restProps} css={mix(cssButton, restProps.css)} ></Div>
}

export default Button
