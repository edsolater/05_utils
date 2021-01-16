/**************************
 * TODO: 还是与实际业务耦合
 *************************/
import { ID } from 'typings/constants'
export interface IdTarget {
  id: ID
  to: 'camera' | 'window'
}
export interface StreamPackage {
  id: ID
  stream: MediaStream
}

/**
 * 观众专用
 * 缓存主播传来的视频信息
 */
let streamCache: {
  streams: StreamPackage[]
  idTargets: IdTarget[]
}
/**
 * 观众专用, 接收到足够的streamId后，输出视频到屏幕上
 */
export function initStreamCache(config: {
  onGetCameraStream: (stream: MediaStream) => void
  onGetWindowStream: (stream: MediaStream) => void
  onFinished?: () => void
}) {
  const streamProxyConfig = {
    set: (target: object, prop: string, value: unknown) => {
      Reflect.set(target, prop, value)
      const streamIds = streamCache.streams.map(({ id }) => id)
      const targetIds = streamCache.idTargets.map(({ id }) => id)
      if (streamIds.every((id) => targetIds.includes(id))) {
        streamCache.idTargets.forEach(({ id, to }) => {
          if (to === 'camera') {
            config.onGetCameraStream(streamCache.streams.find((stream) => stream.id === id)!.stream)
          } else if (to === 'window') {
            config.onGetWindowStream(streamCache.streams.find((stream) => stream.id === id)!.stream)
          }
        })
        config.onFinished?.()
      }
      return true
    },
  }
  streamCache = {
    streams: new Proxy<StreamPackage[]>([], streamProxyConfig),
    idTargets: new Proxy<IdTarget[]>([], streamProxyConfig),
  }
}

/**
 * 副作用函数
 * 主播专用
 * 向peerConnection装载流
 * @todo 需要做一个stream的缓存，add之前先确保pc中没有这个stream
 */
export function loadStream(props: {
  peerConnection: RTCPeerConnection
  streams: (MediaStream | undefined)[]
}) {
  props.streams.forEach((stream) => {
    if (stream) {
      stream.getTracks().forEach((track) => props.peerConnection.addTrack(track, stream))
    }
  })
}

/**
 * 主播专用
 * 通过主播端的stream，计算出idTargets信息包
 * @param props
 */
export function getIdTargets(props: {
  cameraStream: MediaStream | undefined
  windowStream: MediaStream | undefined
}) {
  const idTargets: { id: ID; to: 'window' | 'camera' }[] = []
  if (props.cameraStream) idTargets.push({ id: props.cameraStream.id, to: 'camera' })
  if (props.windowStream) idTargets.push({ id: props.windowStream.id, to: 'window' })
  return idTargets
}

/*
 * 观众专用
 * 当从 dataChannel 收到idTarget信息时时，先缓存下来， 待
 * @param id
 * @param stream
 */
export function cacheIdTarget(idTargets: IdTarget[]) {
  streamCache.idTargets.push(...idTargets)
}

/**
 * 观众专用
 * 当从 peerConnection 收到stream时，先缓存下来， 待
 * @param id
 * @param stream
 */
export function cacheStream(streamPackage: StreamPackage) {
  streamCache.streams.push(streamPackage)
}
