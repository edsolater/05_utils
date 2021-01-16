import Div from 'baseUI/Div'
import Transformable from 'baseUI/Transformable'
import Video from 'baseUI/Video'
import { createConnect, WebRTCIdentity, WebRTCStatus } from 'helper/createConnect/core'
import { evokeCamera, evokeWindow } from 'helper/evokeMedia'
import React, { useState } from 'react'

const BoomHome = () => {
  const [rtcStatus, setrtcStatus] = useState<WebRTCStatus>('waiting')
  const [userIdentity, setuserIdentity] = useState<WebRTCIdentity>('unknown')
  const [cameraStream, setcameraStream] = useState<MediaStream>()
  const [windowStream, setwindowStream] = useState<MediaStream>()
  const [windowSize, setwindowSize] = useState({ width: 0, height: 0 })
  const [isPlaying, setisPlaying] = useState(false)
  const initWindowSize = ({ videoWidth = 0, videoHeight = 0 }) => {
    const videoRatio = videoWidth / videoHeight
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    const viewportRatio = viewportWidth / viewportHeight
    if (videoRatio > viewportRatio) {
      setwindowSize({ width: videoWidth, height: viewportWidth / videoRatio })
    } else {
      setwindowSize({ width: viewportHeight, height: viewportHeight * videoRatio })
    }
  }
  function handleClickJoinBtn() {
    setisPlaying(true)
    createConnect({
      onPrintRemoteCamera(stream) {
        setcameraStream(stream)
      },
      onPrintRemoteWindow(stream) {
        setisPlaying(true)
        setwindowStream(stream)
      },
      openLocalCamera() {
        return evokeCamera().then(stream => {
          if (stream) setcameraStream(stream)
          return stream
        })
      },
      openLocalWindow() {
        return evokeWindow({ video: { width: 1920, frameRate: 60 } }).then(stream => {
          setisPlaying(true)
          if (stream) setwindowStream(stream)
          return stream
        })
      },
      onStatusChange: setrtcStatus,
      onIdentityChange: setuserIdentity
    })
  }
  return (
    <Div css={{ height: '100vh', display: 'grid', placeItems: 'center' }}>
      <Transformable
        css={`
          position: fixed;
          left: 80vw;
          top: 20vh;
          width: 200px;
          height: 200px;
          z-index: 9;
        `}
      >
        <Video fitMode='cover' srcObject={cameraStream} shape='circle' />
      </Transformable>
    </Div>
  )
}
export default BoomHome
