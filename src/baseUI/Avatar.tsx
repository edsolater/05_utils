import Div from './Div'
import React, { CSSProperties, FC } from 'react'

/**
 * 用户头像
 */
const Avatar: FC<{
  placeholder?: boolean
  size?: CSSProperties['width']
  color?: CSSProperties['backgroundColor']
}> = ({ placeholder = false, size = 40, color = 'gray' }) => (
  <Div
    css={{
      width: size,
      height: size,
      borderRadius: '50%',
      backgroundColor: color
    }}
  ></Div>
)
export default Avatar
