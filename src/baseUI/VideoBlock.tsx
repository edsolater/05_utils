/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { CSSProperties, FC, useEffect, useRef } from 'react'

const VideoBlock: FC<{
  width?: CSSProperties['width']
  height?: CSSProperties['height']
  round?: CSSProperties['borderRadius']
}> = ({ width = 200, height = width, round = 1000 }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio:true }).then((stream) => {
      videoRef.current!.srcObject = stream
      videoRef.current!.play()
    })
  }, [])
  return (
    <video
      ref={videoRef}
      css={css({
        objectFit: 'cover',
        borderRadius: round,
      })}
      width={width}
      height={height}
    />
  )
}
export default VideoBlock
