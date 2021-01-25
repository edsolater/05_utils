/****************************************************************************
 *
 * 约定，peerConnection的dataChannels字段会表示该peerConnect有的所有dataChannel
 *
 ****************************************************************************/

import { ID } from 'typings/constants'
import { IdTarget } from './transmitStream'

interface DataChannelMessage {
  TALK_IDS: IdTarget[]
}
const ChannelName = 'from-talker'
/**
 * 主播专用
 * 创建dataChannel
 * 并在dataChannel打通时，发送streamID
 */
export function createDataChannel(info: {
  peerConnection: RTCPeerConnection
  onOpen?: (
    dataChannel: RTCDataChannel,
    methods: {
      send<T extends keyof DataChannelMessage>(command: T, payload: DataChannelMessage[T]): void
    }
  ) => void
}) {
  console.info('【WebRTC】: caller open dataChannel')
  const newDataChannel = info.peerConnection.createDataChannel(ChannelName)
  info.peerConnection['dataChannels'] = [newDataChannel]
  const methods = {
    send<T extends keyof DataChannelMessage>(command: T, payload: DataChannelMessage[T]) {
      newDataChannel.send(JSON.stringify({ command, payload }))
    }
  }
  newDataChannel.addEventListener('open', () => {
    info.onOpen?.(newDataChannel, methods)
  })
  return newDataChannel
}

/**
 * 观众专用
 * 接收dataChannel
 * 通过peerConnection上由主播创建的dataChannel，接收主播的命令
 */
export function acceptDataChannel(info: {
  peerConnection: RTCPeerConnection
  onMessage?: (ev: MessageEvent) => void
  connectionSide?: Peer
}) {
  info.peerConnection.ondatachannel = event => {
    if (info.onMessage) event.channel.addEventListener('message', info.onMessage)
  }
}

/**
 * 观众专用
 * 由 acceptDataChannel 挂载
 * 通过peerConnection上由主播创建的dataChannel，接收主播的命令
 */
export function handleDataChannelMessage(
  event: MessageEvent,
  callbacks: {
    TALK_IDS: (userId: ID, payload: any) => void
  },
  userId: ID
) {
  console.info('get dataChannel message: ', event)
  const { command, payload } = JSON.parse(event.data || '{}')
  callbacks[command]?.(userId, payload)
}
