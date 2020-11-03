import Div, { allPropsName } from './Div'
import React, { CSSProperties, FC, ImgHTMLAttributes } from 'react'
import { divideByPropertyNames } from 'functions'
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
> = ({ isPlaceholder = false, size = 40, color = placeholderColor, src, ...restProps }) => {
  const [restPropsForDiv, restPropsForImg] = divideByPropertyNames(restProps, allPropsName)
  return (
    <Div
      css={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: isPlaceholder ? placeholderColor : color
      }}
    >
      {src && (
        <img
          css={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            objectFit: 'contain'
          }}
          src={src}
          {...restProps}
        />
      )}
    </Div>
  )
}

export default Avatar
