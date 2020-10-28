import Div from './Div'
import React, { CSSProperties, FC } from 'react'

const Logo: FC<{
  width?: CSSProperties['width']
  height?: CSSProperties['height']
  color?: CSSProperties['backgroundColor']
}> = ({ width = 200, height = 56, color = '#333' }) => (
  <Div
    css={{
      width: width,
      height: height,
      borderRadius: 1000,
      backgroundColor: color
    }}
  ></Div>
)
export default Logo
