import Div, { allPropsName, DivProps } from 'baseUI/Div'
import React, { CSSProperties, FC, ImgHTMLAttributes } from 'react'
import divideByPropertyNames from 'utils/object/divideByPropertyNames'
import kickByPropertyNames from 'utils/object/kickByPropertyNames'
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
  } & ImgHTMLAttributes<HTMLImageElement> &
    DivProps
> = ({ isPlaceholder = false, size = 40, color = placeholderColor, src, ...restProps }) => {
  const [restPropsForDiv, restPropsForImg] = divideByPropertyNames(restProps, allPropsName)
  return (
    <Div
      css={[
        {
          width: size,
          height: size,
          borderRadius: '50%',
          backgroundColor: isPlaceholder ? placeholderColor : color
        },
        restProps.css
      ]}
      {...kickByPropertyNames(restPropsForDiv, ['css'])}
    >
      {src && (
        <Div
          as='img'
          css={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            objectFit: 'contain'
          }}
          //@ts-expect-error
          src={src}
          {...restPropsForImg}
        />
      )}
    </Div>
  )
}

export default Avatar
