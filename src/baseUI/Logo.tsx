import Div from './Div'
import React, { CSSProperties, FC } from 'react'

const Logo: FC<{
  shape?: 'circle' | 'capsule'
  width?: CSSProperties['width']
  height?: CSSProperties['height']
  color?: CSSProperties['backgroundColor']
}> = ({
  shape = 'circle',
  height = 56,
  width = shape === 'circle' ? 200 : height,
  color = '#333'
}) => (
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
