import React, { useState } from 'react'
import { BaseUIDiv, divProps, DivProps } from '../Div'
import { mixCSSObjects } from '../../style/cssParser'
import { useImageStyle, ImageStyleProps } from './style'
import pick from 'utils/functions/object/pick'
import isArray from 'utils/functions/judgers/isArray'

export interface ImageProps extends DivProps<'img'>, ImageStyleProps, ImageCoreProp {}
export interface ImageCoreProp {
  /**
   * 可接收 src 数组，代表不断的回退方案。（这些Src并不会同时下载）
   */
  src: string | string[]
  alt?: string
  /**
   * if it can't patch any of src, then, this event listener will be invoked
   */
  onSrcFailed?: () => any
}

/**
 * @BaseUIComponent
 */
const Image = (props: ImageProps) => {
  const { src, alt, onSrcFailed } = props
  const { coreCss } = useImageStyle(props)
  const [errorCount, setErrorCount] = useState(0)
  const [failToLoad, setFailToLoad] = useState(false)
  const targetSrc = isArray(src) ? src[errorCount] ?? src[src.length - 1] : src
  return (
    <BaseUIDiv
      as='img'
      {...pick(props, divProps)}
      _htmlProps={{
        src: targetSrc,
        alt: alt,
        onError: () => {
          if (failToLoad) return
          if (errorCount >= src.length) {
            onSrcFailed?.()
            setFailToLoad(true)
          } else {
            setErrorCount((n) => (n < src.length ? n + 1 : n))
          }
        }
      }}
      _css={mixCSSObjects(props.css, coreCss)}
    />
  )
}

export default Image
