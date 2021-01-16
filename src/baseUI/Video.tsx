/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { CSSProperties, FC, useEffect, useRef } from 'react'

const Video: FC<{
  shape?: 'rect' | 'circle'
  fitMode?: CSSProperties['objectFit']
  srcObject?: MediaStream
  onSourceLoad?: (srcInfo: { width: number; height: number }) => void
}> = ({ shape = 'rect', fitMode = 'cover', srcObject, onSourceLoad }) => {
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
      css={css({
        objectFit: fitMode,
        borderRadius: shape === 'circle' ? 10000 : undefined
      })}
    />
  )
}
export default Video
