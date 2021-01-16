import Div from 'baseUI/Div'
import Transformable from 'baseUI/Transformable'
import Video from 'baseUI/Video'
import StyledButton from 'components/StyledButton'
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
  const initWindowSize = ({ width = 0, height = 0 }) => {
    const videoRatio = width / height
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    const viewportRatio = viewportWidth / viewportHeight
    if (videoRatio > viewportRatio) {
      setwindowSize({ width, height: viewportWidth / videoRatio })
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
      async openLocalCamera() {
        const stream = await evokeCamera()
        if (stream) setcameraStream(stream)
        return stream
      },
      async openLocalWindow() {
        const stream = await evokeWindow({ video: { width: 1920, frameRate: 60 } })
        setisPlaying(true)
        if (stream) setwindowStream(stream)
        return stream
      },
      onStatusChange: setrtcStatus,
      onIdentityChange: setuserIdentity
    })
  }
  return (
    <Div css={{ height: '100vh', display: 'grid', placeItems: 'center' }}>
      <Transformable
        className='camera-view'
        css={{
          position: 'fixed',
          left: '80vw',
          top: '20vh',
          zIndex: 9
        }}
      >
        <Video
          fitMode='cover'
          css={{ width: 200, height: 200 }}
          srcObject={cameraStream}
          shape='circle'
        />
      </Transformable>
      {!isPlaying && (
        <StyledButton
          className='join-btn'
          css={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1
          }}
          onClick={handleClickJoinBtn}
        >
          boom
        </StyledButton>
      )}
      <Transformable className='window-view'>
        <Video
          onSourceLoad={initWindowSize}
          fitMode='contain'
          srcObject={windowStream}
          shape='rect'
          css={windowSize}
        />
        <Div className='user-identity'>当前身份：{userIdentity}</Div>
      </Transformable>
    </Div>
  )
}
export default BoomHome