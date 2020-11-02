import Div from './Div'
import React, { CSSProperties, FC, ImgHTMLAttributes } from 'react'

const placeholderColor = 'gray'
/**
 * 用户头像
 */
const Avatar: FC<
  {
    isPlaceholder?: boolean
    src?: string
    size?: CSSProperties['width']
    color?: CSSProperties['backgroundColor']
  } & ImgHTMLAttributes<HTMLImageElement>
> = ({ isPlaceholder = false, size = 40, color = placeholderColor, src, ...restProps }) =>
// TODO 我觉得还要简化，为了更灵活，就<Div>包<img>
  !src || isPlaceholder ? (
    <Div
      css={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: isPlaceholder ? placeholderColor : color
      }}
    ></Div>
  ) : (
    <img
      css={{
        width: size,
        height: size,
        borderRadius: '50%',
        objectFit: 'contain'
      }}
      src={src}
      {...restProps}
    />
  )
export default Avatar

const a = () => <Avatar />
