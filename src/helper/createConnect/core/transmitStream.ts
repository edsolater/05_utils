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
const streamCache: {
  [userID in ID]: {
    streams: StreamPackage[]
    idTargets: IdTarget[]
  }
} = {}
/**
 * 观众专用, 接收到足够的streamId后，输出视频到屏幕上
 */
export function initStreamCache(options: {
  userId: ID
  onGetCameraStream: (userId: ID, stream: MediaStream) => void
  onFinished?: (userId: ID) => void
}) {
  const streamProxyConfig = {
    set: (target: StreamPackage[] | IdTarget[], prop: string, value: unknown) => {
      Reflect.set(target, prop, value)
      console.log('streamCache[options.userId]: ', streamCache[options.userId])
      const streamIds = streamCache[options.userId].streams.map(({ id }) => id)
      const targetIds = streamCache[options.userId].idTargets.map(({ id }) => id)
      if (streamIds.every((id) => targetIds.includes(id))) {
        streamCache[options.userId].idTargets.forEach(({ id, to }) => {
          if (to === 'camera') {
            options.onGetCameraStream(
              options.userId,
              streamCache[options.userId].streams.find((stream) => stream.id === id)!.stream
            )
          }
        })
        options.onFinished?.(options.userId)
      }
      return true
    }
  }
  streamCache[options.userId] = {
    streams: new Proxy<StreamPackage[]>([], streamProxyConfig),
    idTargets: new Proxy<IdTarget[]>([], streamProxyConfig)
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
export function generateIdTargets(props: { cameraStream: MediaStream | undefined }) {
  const idTargets: { id: ID; to: 'window' | 'camera' }[] = []
  if (props.cameraStream) idTargets.push({ id: props.cameraStream.id, to: 'camera' })
  return idTargets
}

/*
 * 观众专用
 * 当从 dataChannel 收到idTarget信息时时，先缓存下来， 待
 * @param id
 * @param stream
 */
export function cacheIdTarget(userId: ID, idTargets: IdTarget[]) {
  streamCache[userId].idTargets.push(...idTargets)
}

/**
 * 观众专用
 * 当从 peerConnection 收到stream时，先缓存下来， 待
 * @param id
 * @param stream
 */
export function cacheStream(userId: ID, streamPackage: StreamPackage) {
  streamCache[userId].streams.push(streamPackage)
}
