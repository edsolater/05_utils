import Div, { allPropsName, DivProps } from '../baseUI/Div'
import React, { CSSProperties, FC, ImgHTMLAttributes } from 'react'
import divideByPropertyNames from 'utils/object/divideByPropertyNames'
import { IFC } from 'typings/reactType'
const placeholderColor = 'gray'
/**
 * 普通Button，TODO
 */
const Button: IFC<
  {
    isPlaceholder?: boolean
    src?: string
    size?: CSSProperties['width']
    color?: CSSProperties['backgroundColor']
  } & ImgHTMLAttributes<HTMLImageElement> &
    DivProps
> = ({ isPlaceholder = false, size = 40, color = placeholderColor, src, ...restProps }) => {
  return (
    <Div
      {...restProps}
      css={[
        {
          width: size,
          height: size,
          borderRadius: '50%',
          backgroundColor: isPlaceholder ? placeholderColor : color
        },
        restProps.css
      ]}
    >
    </Div>
  )
}

export default Button
