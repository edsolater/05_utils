import React, { useState } from 'react'
import { BaseUIDiv, divProps, DivProps } from './Div'
import { mixCSSObjects } from '../style/cssParser'
import pick from 'utils/functions/object/pick'
import isArray from 'utils/functions/judgers/isArray'
import cache from 'utils/functions/functionFactory/cache'
import { useAppSettings } from './AppSettings'
import mergeProps from 'baseUI/functions/mergeProps'
import addDefaultProps from 'baseUI/functions/addDefaultProps'

export interface ImageProps extends DivProps<'img'> {
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
export interface ImageSprops extends ImageProps {}

const defaultSprops: ImageSprops = { src: '' }

const getCSS = cache((props: ImageProps) => mixCSSObjects())
/**
 * @BaseUIComponent·
 */
const Image = (props: ImageProps) => {
  const appSettings = useAppSettings()
  const _sprops = mergeProps(appSettings.globalProps?.Image, props)
  const sprops = addDefaultProps(_sprops, defaultSprops)

  const { src, alt, onSrcFailed } = sprops
  const [errorCount, setErrorCount] = useState(0)
  const [failToLoad, setFailToLoad] = useState(false)
  const targetSrc = isArray(src) ? src[errorCount] ?? src[src.length - 1] : src
  return (
    <BaseUIDiv
      {...pick(sprops, divProps)}
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
