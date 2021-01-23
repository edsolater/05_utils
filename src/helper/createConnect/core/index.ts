/*******
 * 文件用途：
 * 建立webRTC连接的逻辑
 * todo：关键节点：offer、answer、candidate、dataChannel还是没有拆开
 *******/
import {
  AddWebsockMessageListener,
  createWebsocket,
  WebsocketMessageRuntimeFormat,
  WebsocketSend
} from 'helper/websocket'
import randomCreateId from 'utils/string/randomCreateId'
import { ID, SessionID } from 'typings/constants'
import { createRTCAnswer, createRTCOffer, receiveRTCAnswer, receiveRTCOffer } from './offer&answer'
import { acceptIceCandidate, receiveIceCandidate, sendCandidates } from './candidate'
import { createDataChannel, acceptDataChannel, handleDataChannelMessage } from './dataChannel'
import {
  cacheIdTarget,
  cacheStream,
  generateIdTargets,
  initStreamCache,
  loadStream
} from './transmitStream'
import assert from 'utils/magic/assert'

export type WebRTCIdentity =
  | 'unknown' // 未知
  | 'TALKER' // 主播
  | 'AUDIENCE' // 观众
export type WebRTCStatus =
  | 'waiting' // 等待连接状态
  | 'pending' // 已感知到对方，正在交换证书、传输数据
  | 'done' // 只要发出了candidate，就是done
export type IParams = {
  //TODO: 配置暂时写死在文件中，后得靠传进来
  onReady?: (...args: any[]) => void
  onIdentityChange?: (identity: WebRTCIdentity) => void
  onStatusChange?: (currentStatus: WebRTCStatus) => void
  onPrintRemoteCamera: (stream: MediaStream) => void
  onPrintRemoteWindow: (stream: MediaStream) => void
  openLocalCamera: (...args: any[]) => Promise<MediaStream | undefined>
  openLocalWindow: (...args: any[]) => Promise<MediaStream | undefined>
}
type Commands = {
  /* --------------------------------- 告知后端的命令 -------------------------------- */

  // 当用户进入时，告知后端一声
  JOIN: {
    userId: ID
    roomId: ID // 如果传入空字符串，则后端生成一个，这个人必定是主播。传入指定roomId，则逻辑为“加入某个会议”，这个人必定是观众。
  }

  // 后端紧接着敲定身份信息
  IDENTITY: {
    members: ID[] // FIXME: 后端问题：第二个用户加入时，只返回了一个
  }

  /* ------------------------------ 后端无感，告知rtc的对方 ----------------------------- */

  // 【观众发起】
  //【主播接收】通知主播：可以发来OFFER了
  CREATE_CONNECT: {
    // TODO： 暂时使用userID代替sessionID
    fromUserId: SessionID
    toUserId: SessionID | 'all'
    roomId: ID
  }

  //【主播发起】主播给后端offer信息
  //【观众接收】观众从后端收到主播的offer信息
  OFFER: {
    content: RTCSessionDescriptionInit
    fromUserId: SessionID
    toUserId: SessionID | 'all'
    roomId: ID
  }

  //【观众发起】观众给后端answer信息
  // 【主播接收】主播从后端收到观众的answer信息
  ANSWER: {
    content: RTCSessionDescriptionInit
    fromUserId: SessionID
    toUserId: SessionID | 'all'
    roomId: ID
  }

  // 【主播/观众互相发起】
  // 【主播/观众互相接收】
  CANDIDATE: {
    content: RTCIceCandidate
    fromUserId: SessionID
    toUserId: SessionID | 'all'
    roomId: ID
  }
}
const offerOptions: RTCOfferOptions = {
  iceRestart: true,
  offerToReceiveAudio: true, //true,由于没有麦克风，如果请求音频，会报错，不过不会影响视频流播放
  offerToReceiveVideo: true
}
const localStreamCache = {
  cameraStream: undefined as MediaStream | undefined,
  windowStream: undefined as MediaStream | undefined
}
const peerConnections = new Map<SessionID, RTCPeerConnection>()
const rtcConfiguration: RTCConfiguration = {
  iceServers: [{ urls: 'stun:stun.services.mozilla.com' }, { urls: 'stun:stun.l.google.com:19302' }]
}

/**
 * 新建一条websocket
 * （这应该是一个应用中唯一的一条websocket）
 */
export function initAppWebsocket(props: IParams) {
  const roomId = '87' // TODO：应该在UI上，由观众自己定
  const userId = randomCreateId() //TEMP 暂时使用userID代替sessionID，且
  createWebsocket<Commands>({
    url: `ws://47.101.188.77:8899/websocket/${roomId}/${userId}`,
    onOpen({ send }) {
      send('JOIN', { roomId, userId })
      props.openLocalCamera().then(stream => (localStreamCache.cameraStream = stream))
    },
    onMessage({ message, send, addMessageListener }) {
      switch (message.command) {
        case 'IDENTITY': {
          const peers = message.payload.members.filter(memberId => `${memberId}` !== `${userId}`)
          for (const peerId of peers) {
            send('CREATE_CONNECT', { fromUserId: userId, toUserId: peerId, roomId: roomId })
          }
          //TODO: 要把用户信息，展示在屏幕界面上
          // //记录后端敲定的userId与roomId

          // // 从后端返回中推断出自己的身份
          // const identity = message.payload.talkerId === userId ? 'TALKER' : 'AUDIENCE'

          // // 触发回调：用户身份改变
          // props.onIdentityChange?.(identity)

          // if (identity === 'TALKER') {
          //   // 打开摄像头并捕获窗口视频流
          //   Promise.all([props.openLocalCamera(), props.openLocalWindow()]).then(
          //     ([localCameraStream, localWindowStream]) => {
          //       localStreamCache.cameraStream = localCameraStream
          //       localStreamCache.windowStream = localWindowStream
          //     }
          //   )
          // } else if (identity === 'AUDIENCE') {
          //   // 初始化观众端的streamCache
          //   initStreamCache({
          //     onGetCameraStream: props.onPrintRemoteCamera,
          //     onGetWindowStream: props.onPrintRemoteWindow,
          //     onFinished: () => {
          //       props.onStatusChange?.('done')
          //       props.onReady?.()
          //     }
          //   })

          //   // 向主播索要新的offer
          //   const talkerId = message.payload.talkerId
          //   websocketSend('CREATE_CONNECT', { fromUserId: userId, toUserId: talkerId, roomId })
          // }
          break
        }
        case 'CREATE_CONNECT': {
          createConnection(props, {
            selfId: userId,
            peerId: message.payload.fromUserId,
            roomId,
            send,
            addMessageListener
          })
        }
      }
    }
  })
}

/**
 * 新建一条peerConnection（此时必须已经建立websocket）
 * @param props 建立webRTC所使用的配置项
 */
export function createConnection(
  props: IParams,
  info: {
    roomId: ID
    selfId: ID
    peerId: ID
    send: WebsocketSend<Commands>
    addMessageListener: AddWebsockMessageListener<Commands>
  }
) {
  const peerConnection = new RTCPeerConnection(rtcConfiguration)
  peerConnections.set(info.peerId, peerConnection)
  // 定义传来iceCandidate的行为
  acceptIceCandidate({ peerConnection })

  // 创建dataChannel
  createDataChannel({
    peerConnection,
    onOpen: (_dataChannel, { send }) => {
      send(
        'TALK_IDS',
        generateIdTargets({
          cameraStream: localStreamCache.cameraStream,
          windowStream: localStreamCache.windowStream
        })
      )
    }
  })

  // 向peerconnection装载stream
  loadStream({
    peerConnection,
    streams: [localStreamCache.cameraStream, localStreamCache.windowStream]
  })

  // 创建新offer并发送
  createRTCOffer({ peerConnection, offerOptions }).then(offer => {
    console.info('(WebRTC)RPOCESS: send OFFER', offer)
    info.send('OFFER', {
      content: offer,
      fromUserId: info.selfId,
      toUserId: info.peerId,
      roomId: info.roomId
    })
  })

  /**
   * 处理后端传来的信息(也是调度中心)
   * @param event 带有后端传来的信息的事件
   */
  const handleWebsocketMessage = (
    message: WebsocketMessageRuntimeFormat<Commands>,
    websocketSend: WebsocketSend<Commands>
  ) => {
    switch (message.command) {
      case 'OFFER': {
        console.info('(WebRTC)RPOCESS: receive backend OFFER')

        // 定义如何接收主播端iceCandidate
        acceptIceCandidate({ peerConnection })

        // 定义如何接收主播端通过dataChannel传来的track分别是什么的信息
        acceptDataChannel({
          peerConnection,
          onMessage(ev) {
            handleDataChannelMessage(ev, { TALK_IDS: cacheIdTarget })
          }
        })
        // 定义如何接收主播端传来的track
        peerConnection.addEventListener('track', event => {
          const stream = event.streams[0]
          const id = stream.id
          cacheStream({ id, stream })
        })

        // 观众收到offer，后发送answer
        receiveRTCOffer({ peerConnection, content: message.payload.content }).then(() => {
          props.onIdentityChange?.('AUDIENCE')
          createRTCAnswer({
            peerConnection,
            offerOptions
          }).then(answer => {
            console.info('(WebRTC)RPOCESS: 观众开始发送ANSWER', answer)
            websocketSend('ANSWER', {
              content: answer,
              fromUserId: info.selfId,
              toUserId: info.peerId,
              roomId: info.roomId
            })
          })
        })
        break
      }
      case 'ANSWER': {
        console.info('(WebRTC)RPOCESS: receive backend ANSWER')

        // 触发回调：连接状态改变（感知到对方，正在交换证书）
        props.onStatusChange?.('pending')

        // 主播收到answer，后发送candidate
        receiveRTCAnswer({ peerConnection, content: message.payload.content }).then(() => {
          sendCandidates({
            peerConnection,
            action: candidate =>
              websocketSend('CANDIDATE', {
                content: candidate,
                fromUserId: info.selfId,
                toUserId: info.peerId,
                roomId: info.roomId
              })
          })
          // 触发回调：连接状态改变（所有处理已完毕）
          props.onStatusChange?.('done')
        })
        break
      }
      case 'CANDIDATE': {
        console.info('(WebRTC)RPOCESS: receive backend CANDIDATE')

        // 收到对方的candidate，转而发出自身的candidate
        receiveIceCandidate({ peerConnection, content: message.payload.content }).then(() => {
          sendCandidates({
            //实际上只有观众会触发
            peerConnection,
            action: candidate =>
              websocketSend('CANDIDATE', {
                content: candidate,
                fromUserId: info.selfId,
                toUserId: info.peerId,
                roomId: info.roomId
              })
          })
          // 触发回调：连接状态改变（所有处理已完毕（此时视频流已装载，但还没有流过实际内容））
          props.onStatusChange?.('done')
        })
        break
      }
      default: {
        console.warn(`unknow command: ${message.command as string}`)
      }
    }
  }
  info.addMessageListener(({ message, send }) => handleWebsocketMessage(message, send))
  return peerConnection
}
