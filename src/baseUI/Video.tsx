/** @jsx jsx */
import { jsx, css as cssMerge, Interpolation } from '@emotion/core'
import { CSSProperties, FC, useEffect, useRef } from 'react'

const Video: FC<{
  shape?: 'rect' | 'circle'
  fitMode?: CSSProperties['objectFit']
  srcObject?: MediaStream
  onSourceLoad?: (srcInfo: { width: number; height: number }) => void
  css?: Interpolation
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
    <video
      ref={videoRef}
      className={className}
      css={cssMerge([
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
