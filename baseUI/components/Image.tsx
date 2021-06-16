import React, { useState } from 'react'
import { divProps, DivProps } from './Div'
import pick from 'utils/functions/object/pick'
import isArray from 'utils/functions/judgers/isArray'
import { injectAppSetting } from './AppSettings'
import { BaseUIDiv } from '.'

export interface ImageProps extends DivProps<'img'> {
  /**
   * 可接收 src 数组，代表不断的回退方案。（这些Src并不会同时下载）
   */
  src?: string | string[]
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
          if (failToLoad || !src) return
          if (errorCount >= src.length) {
            onSrcFailed?.()
            setFailToLoad(true)
          } else {
            setErrorCount((n) => (n < src.length ? n + 1 : n))
          }
        }
      }}
    />
  )
}

export default injectAppSetting(Image)
