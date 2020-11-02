import Div, { allPropsName } from './Div'
import React, { CSSProperties, FC, ImgHTMLAttributes } from 'react'
import { objectFilter, objectReduce } from 'functions'

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
    function pickByPropertyName<T extends object>(obj: T, propNameList: Array<keyof T | string>) {
      return objectFilter(obj, ([key]) => propNameList.includes(key))
    }
    function splitByPropertyName<T extends object>(
      obj: T,
      propNameList: ReadonlyArray<keyof T | string>
    ): [Partial<T>, Partial<T>] {
      return objectReduce(
        obj,
        (acc, [key]) => {
          if (propNameList.includes(key)) {
            acc[0][key] = obj[key]
          } else {
            acc[1][key] = obj[key]
          }
          return acc
        },
        [{}, {}]
      )
    }
    const [restPropsForDiv, restPropsForImg] = splitByPropertyName(restProps, allPropsName)
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

const a = () => <Avatar />
