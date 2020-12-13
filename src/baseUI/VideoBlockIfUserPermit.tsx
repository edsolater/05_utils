/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { CSSProperties, FC, useEffect, useRef } from 'react'

const VideoBlockIfUserPermit: FC<{
  width?: CSSProperties['width']
  height?: CSSProperties['height']
}> = ({ width = 800 }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  function catchUserScreen() {
    //@ts-ignore
    navigator.mediaDevices.getDisplayMedia({ video: true }).then((stream) => {
      videoRef.current!.srcObject = stream
      videoRef.current!.play()
    })
  }
  return (
    <div className="content-box">
      <video
        ref={videoRef}
        css={css({
          objectFit: 'cover',
        })}
        width={width}
      />
      <button onClick={catchUserScreen}>屏幕分享</button>
    </div>
  )
}
export default VideoBlockIfUserPermit
