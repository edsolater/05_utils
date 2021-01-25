/****************************************************************************
 *
 * 约定，peerConnection的dataChannels字段会表示该peerConnect有的所有dataChannel
 *
 ****************************************************************************/

import { ID } from 'typings/constants'
import { PeerConnectionSide } from '.'
import { IdTarget } from './transmitStream'

interface DataChannelMessage {
  CALLER_STREAM_IDS: IdTarget[]
  RECEIVER_STREAM_IDS: IdTarget[]
}
const ChannelName = 'from-talker'
/**
 * 创建dataChannel
 * 并在dataChannel打通时，发送streamID
 */
export function createDataChannel(
  peerConnection: RTCPeerConnection,
  events: {
    onOpen?: (info: {
      event: Event
      channel: RTCDataChannel
      send<T extends keyof DataChannelMessage>(command: T, payload: DataChannelMessage[T]): void
    }) => void
    onMessage?: (info: {
      event: MessageEvent
      channel: RTCDataChannel
      send<T extends keyof DataChannelMessage>(command: T, payload: DataChannelMessage[T]): void
    }) => void
  } = {}
) {
  console.info('【WebRTC】发送者新建一条dataChannel')
  const channel = peerConnection.createDataChannel(ChannelName)
  const send = <T extends keyof DataChannelMessage>(command: T, payload: DataChannelMessage[T]) =>
    channel.send(JSON.stringify({ command, payload }))
  if (events.onOpen) {
    channel.addEventListener('open', (ev) => {
      events.onOpen?.({ event: ev, channel, send })
    })
  }
  if (events.onMessage) {
    channel.addEventListener('message', (ev) => {
      events.onMessage?.({ event: ev, channel, send })
    })
  }
  return channel
}

/**
 * 接收dataChannel
 * 通过peerConnection上由主播创建的dataChannel，接收主播的命令
 */
export function acceptDataChannel(
  peerConnection: RTCPeerConnection,
  events: {
    onMessage?: (info: {
      event: MessageEvent
      channel: RTCDataChannel
      send<T extends keyof DataChannelMessage>(command: T, payload: DataChannelMessage[T]): void
    }) => void
  } = {}
) {
  peerConnection.ondatachannel = (event) => {
    const channel = event.channel
    const send = <T extends keyof DataChannelMessage>(command: T, payload: DataChannelMessage[T]) =>
      channel.send(JSON.stringify({ command, payload }))
    if (events.onMessage)
      event.channel.addEventListener('message', (ev) => {
        events.onMessage?.({ event: ev, channel, send })
      })
  }
}

/**
 * 由 acceptDataChannel 挂载
 * 通过peerConnection上由主播创建的dataChannel，接收主播的命令
 */
export function handleDataChannelMessage(
  event: MessageEvent,
  callbacks: {
    CALLER_STREAM_IDS?: (userId: ID, payload: any) => void
    RECEIVER_STREAM_IDS?: (userId: ID, payload: any) => void
  },
  userId: ID
) {
  console.info('【WebRTC】接收者从dataChannel中获取信息', event)
  const { command, payload } = JSON.parse(event.data || '{}')
  callbacks[command]?.(userId, payload)
}
