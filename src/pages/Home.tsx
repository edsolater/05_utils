import Div from 'baseUI/Div'
import Transformable from 'baseUI/Transformable'
import Video from 'baseUI/Video'
import StyledButton from 'pages/components/StyledButton'
import { initAppWebsocket } from 'helper/createConnect/core'
import { evokeCamera } from 'helper/evokeMedia'
import React, { useState } from 'react'
import { fullPer, toPer } from 'style/cssUnits'
import { ID } from 'typings/constants'

const Home = () => {
  const [cameraStream, setcameraStream] = useState<Map<ID, MediaStream>>(new Map())
  const [isPlaying, setisPlaying] = useState(false)
  function handleClickJoinBtn() {
    setisPlaying(true)
    initAppWebsocket({
      onGetRemoteStream({ peerId, stream }) {
        setcameraStream((cameraStream) => new Map([...cameraStream, [peerId, stream]]))
      },
      async requestLocalStream({ selfId }) {
        const stream = await evokeCamera()
        if (stream) setcameraStream((cameraStream) => new Map([...cameraStream, [selfId, stream]]))
        return stream
      },
      onCreatePeerConnection({ getDownloadSpeed, getUploadSpeed, peerId }) {
        setInterval(() => {
          const downloadSpeed = getDownloadSpeed()
          const uploadSpeed = getUploadSpeed()
          console.log('downloadSpeed', downloadSpeed)
          console.log('uploadSpeed', uploadSpeed)
        }, 1000)
      }
    })
  }
  return (
    <Div css={{ height: '100vh', display: 'grid', placeItems: 'center' }}>
      {[...cameraStream.entries()].map(([userId, stream], idx) => (
        <Transformable
          key={userId}
          className='camera-view'
          innerShape='circle'
          moveBoundary='none'
          css={{
            position: 'fixed',
            left: toPer(80),
            top: toPer(20 * (idx + 1)),
            zIndex: 9,
            width: 200,
            height: 200
          }}
          resizable
        >
          <Video
            fitMode='cover'
            css={{ width: fullPer, height: fullPer }}
            srcObject={stream}
            shape='circle'
          />
        </Transformable>
      ))}
      {!isPlaying && (
        <StyledButton
          className='join-btn'
          css={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1,
            fontSize: 28
          }}
          onClick={handleClickJoinBtn}
        >
          RTC
        </StyledButton>
      )}
    </Div>
  )
}
export default Home
