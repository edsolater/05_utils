import React from 'react'
import { CSSObject } from '@emotion/react'
import { mixCSSObjects } from '../style/cssParser'
import { CSSProperties, FC, useEffect, useRef } from 'react'
import Div from './Div'

const Video: FC<{
  shape?: 'rect' | 'circle'
  fitMode?: CSSProperties['objectFit']
  srcObject?: MediaStream
  onSourceLoad?: (srcInfo: { width: number; height: number }) => void
  css?: CSSObject
  className?: string
}> = ({ shape = 'rect', fitMode = 'cover', srcObject, onSourceLoad, css, className }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    videoRef.current!.onplaying = () => {
      const videoWidth = videoRef.current!.videoWidth
      const videoHeight = videoRef.current!.videoHeight
      onSourceLoad?.({ width: videoWidth, height: videoHeight })
    }
  }, [])
  useEffect(() => {
    if (srcObject) {
      videoRef.current!.srcObject = srcObject
      videoRef.current!.play()
    }
  }, [srcObject])
  return (
    <Div
      as='video'
      domRef={videoRef}
      className={className}
      css={mixCSSObjects([
        {
          objectFit: fitMode,
          borderRadius: shape === 'circle' ? 10000 : undefined
        },
        css
      ])}
    />
  )
}
export default Video
