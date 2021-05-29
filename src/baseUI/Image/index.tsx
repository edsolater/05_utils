import React, { useState } from 'react'
import { BaseUIDiv, divProps, DivProps } from 'baseUI/Div'
import { mixCSSObjects } from 'style/cssParser'
import { useImageStyle, ImageStyleProps } from './style'
import pick from 'utils/object/pick'
import isArray from 'utils/judgers/isArray'

export interface ImageProps extends DivProps<'img'>, ImageStyleProps, ImageCoreProp {}
export interface ImageCoreProp {
  /**
   * 可接收 src 数组，代表不断的回退方案。（这些Src并不会同时下载）
   */
  src: string | string[]
  alt?: string
}

/**
 * @BaseUIComponent
 */
const Image = (props: ImageProps) => {
  const { coreCss } = useImageStyle(props)
  const [errorCount, setErrorCount] = useState(0)
  const targetSrc = isArray(props.src)
    ? props.src[errorCount] ?? props.src[props.src.length - 1]
    : props.src
  return (
    <BaseUIDiv
      as='img'
      {...pick(props, divProps)}
      _htmlProps={{
        src: targetSrc,
        alt: props.alt,
        onError: () => {
          setErrorCount((n) => (n < props.src.length ? n + 1 : n))
        }
      }}
      _css={mixCSSObjects(props.css, coreCss)}
    />
  )
}

export default Image
