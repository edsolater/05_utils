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

export type RTCEvents = {
  //TODO: 配置暂时写死在文件中，后得靠传进来
  onReady?: (...args: any[]) => void
  onPrintCamera: (userId: ID, stream: MediaStream) => void
  openLocalCamera: (userId: ID) => Promise<MediaStream | undefined>
}
export type PeerConnectionSide = 'CALLER' | 'RECEIVER'
export const peerConnectionSide = {
  //TODO: 这里是不是用 enum 更可读一点
  caller: 'CALLER' /* 主动方 */,
  receiver: 'RECEIVER' /* 被动方 */
} as const
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
  cameraStream: undefined as MediaStream | undefined
}
const peerConnections = new Map<SessionID, RTCPeerConnection>()
const rtcConfiguration: RTCConfiguration = {
  iceServers: [{ urls: 'stun:stun.services.mozilla.com' }, { urls: 'stun:stun.l.google.com:19302' }]
}

/**
 * 新建一条websocket
 * 一系列webRTC通讯中唯一websocket
 */
export async function initAppWebsocket(events: RTCEvents) {
  const roomId = '91' // TODO：应该在UI上，由观众自己定
  const currentUserId = randomCreateId() //TEMP 暂时使用userID代替sessionID，且
  createWebsocket<Commands>({
    url: `ws://47.101.188.77:8899/websocket/${roomId}/${currentUserId}`,
    async onBeforeOpen() {
      const stream = await events.openLocalCamera(currentUserId)
      localStreamCache.cameraStream = stream
    },
    onOpen({ send }) {
      send('JOIN', { roomId, userId: currentUserId })
    },
    onMessage({ message, send, addMessageListener }) {
      switch (message.command) {
        case 'IDENTITY': {
          const peers = message.payload.members.filter(
            (memberId) => `${memberId}` !== `${currentUserId}`
          )
          for (const peerId of peers) {
            initStreamCache({
              userId: peerId,
              onGetCameraStream(peerId, stream) {
                events.onPrintCamera(peerId, stream)
              }
            })
            send('CREATE_CONNECT', { fromUserId: currentUserId, toUserId: peerId, roomId: roomId })
            createConnection({
              selfId: currentUserId,
              peerId: peerId,
              roomId,
              websocketSend: send,
              addMessageListener,
              side: peerConnectionSide.receiver
            })
          }
          break
        }
        case 'CREATE_CONNECT': {
          initStreamCache({
            userId: message.payload.fromUserId,
            onGetCameraStream(peerId, stream) {
              events.onPrintCamera(peerId, stream)
            }
          })
          createConnection({
            selfId: currentUserId,
            peerId: message.payload.fromUserId,
            roomId,
            websocketSend: send,
            addMessageListener,
            side: peerConnectionSide.caller
          })
        }
      }
    }
  })
}

/**
 * 【脏函数】
 * 新建一条peerConnection（此时必须已经建立websocket）
 *
 * 此函数存放初始化的操作
 * @param events 建立webRTC所使用的配置项
 */
export function createConnection(info: {
  roomId: ID
  selfId: ID
  peerId: ID
  websocketSend: WebsocketSend<Commands>
  addMessageListener: AddWebsockMessageListener<Commands>
  side: PeerConnectionSide
}) {
  // 我觉得可以拆成单独的函数：init，createOffer等等
  const peerConnection = new RTCPeerConnection(rtcConfiguration)
  peerConnections.set(info.peerId, peerConnection)
  // 向peerconnection装载stream
  loadStream({
    peerConnection,
    streams: [localStreamCache.cameraStream]
  })
  // 定义传来iceCandidate的行为
  acceptIceCandidate({ peerConnection })
  // 定义如果接收到track，就缓存进本地
  peerConnection.addEventListener('track', (event) => {
    console.log('track: ', event) // caller 也能接收到两个track
    const stream = event.streams[0]
    const id = stream.id
    cacheStream(info.peerId, { id, stream })
  })
  if (info.side === peerConnectionSide.caller) {
    // 创建dataChannel // FIXME: 问题在于DataChannel里只有caller端的视频信息
    createDataChannel(peerConnection, {
      onOpen: ({ send }) => {
        send(
          'CALLER_STREAM_IDS',
          generateIdTargets({ cameraStream: localStreamCache.cameraStream })
        )
      },
      onMessage: ({ event }) =>
        handleDataChannelMessage(event, { RECEIVER_STREAM_IDS: cacheIdTarget }, info.peerId)
    })
    // 创建新offer并发送
    createRTCOffer({ peerConnection, offerOptions }).then((offer) => {
      console.info('【WebRTC】: send OFFER', offer)
      info.websocketSend('OFFER', {
        content: offer,
        fromUserId: info.selfId,
        toUserId: info.peerId,
        roomId: info.roomId
      })
    })
  }
  if (info.side === peerConnectionSide.receiver) {
    // 定义如何接收通过dataChannel传来的track分别是什么的信息
    acceptDataChannel(peerConnection, {
      onMessage({ event, send }) {
        handleDataChannelMessage(
          event,
          {
            CALLER_STREAM_IDS(...params) {
              cacheIdTarget(...params)
              send(
                'RECEIVER_STREAM_IDS',
                generateIdTargets({ cameraStream: localStreamCache.cameraStream })
              )
            }
          },
          info.peerId
        )
      }
    })
  }

  info.addMessageListener(({ message, send }) => {
    if (
      message.command === 'OFFER' ||
      message.command === 'ANSWER' ||
      message.command === 'CANDIDATE'
    )
      handleWebsocketMessage({
        peerConnection,
        message,
        websocketSend: send,
        peerId: info.peerId,
        selfId: info.selfId,
        roomId: info.roomId
      })
  })
  return peerConnection
}

/**
 * 处理后端传来的信息(如果peerID与fromUserId不匹配，就不处理)
 * @param event 带有后端传来的信息的事件
 */
const handleWebsocketMessage = ({
  peerConnection,
  message,
  websocketSend,
  selfId,
  peerId,
  roomId
}: {
  peerConnection: RTCPeerConnection
  message: WebsocketMessageRuntimeFormat<Pick<Commands, 'OFFER' | 'ANSWER' | 'CANDIDATE'>>
  websocketSend: WebsocketSend<Commands>
  peerId: ID
  selfId: ID
  roomId: ID
}) => {
  if (message.payload.fromUserId !== peerId) return
  switch (message.command) {
    case 'OFFER': {
      console.info('【WebRTC】: receive backend OFFER')
      // 观众收到offer，后发送answer
      receiveRTCOffer({ peerConnection, content: message.payload.content }).then(() => {
        createRTCAnswer({
          peerConnection,
          offerOptions
        }).then((answer) => {
          console.info('【WebRTC】: 观众开始发送ANSWER', answer)
          websocketSend('ANSWER', {
            content: answer,
            fromUserId: selfId,
            toUserId: peerId,
            roomId: roomId
          })
        })
      })
      break
    }
    case 'ANSWER': {
      console.info('【WebRTC】: receive backend ANSWER')
      // 主播收到answer，后发送candidate
      receiveRTCAnswer({ peerConnection, content: message.payload.content }).then(() => {
        sendCandidates({
          peerConnection,
          action: (candidate) =>
            websocketSend('CANDIDATE', {
              content: candidate,
              fromUserId: selfId,
              toUserId: peerId,
              roomId: roomId
            })
        })
      })
      break
    }
    case 'CANDIDATE': {
      console.info('【WebRTC】: receive backend CANDIDATE')

      // 收到对方的candidate，转而发出自身的candidate
      receiveIceCandidate({ peerConnection, content: message.payload.content }).then(() => {
        sendCandidates({
          peerConnection,
          action: (candidate) =>
            websocketSend('CANDIDATE', {
              content: candidate,
              fromUserId: selfId,
              toUserId: peerId,
              roomId: roomId
            })
        })
      })
      break
    }
  }
}
