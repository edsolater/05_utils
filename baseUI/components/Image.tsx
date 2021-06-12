import React, { useState } from 'react'
import { BaseUIDiv, divProps, DivProps } from './Div'
import { mixCSSObjects } from '../style/cssParser'
import pick from 'utils/functions/object/pick'
import isArray from 'utils/functions/judgers/isArray'
import cache from 'utils/functions/functionFactory/cache'

interface ImageCSSProps {}
export interface ImageProps extends DivProps<'img'>, ImageCSSProps {
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

const getCSS = cache((props: ImageCSSProps) => mixCSSObjects())
/**
 * @BaseUIComponent
 */
const Image = (props: ImageProps) => {
  const { src, alt, onSrcFailed } = props
  const [errorCount, setErrorCount] = useState(0)
  const [failToLoad, setFailToLoad] = useState(false)
  const targetSrc = isArray(src) ? src[errorCount] ?? src[src.length - 1] : src
  return (
    <BaseUIDiv
      {...pick(props, divProps)}
      as='img'
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
      _css={getCSS(props)}
    />
  )
}

export default Image
