// import { reactive, watch } from 'vue'
// import { WebRTCIdentity, WebRTCStatus, createConnection } from './core'

// export default function useWebRTC(configs: {
//   onIdentityChange?: (curIdentity: WebRTCIdentity, prevIdentity: WebRTCIdentity) => void
//   onStatusChange?: (currentStatus: WebRTCStatus, prevStatus: WebRTCStatus) => void
//   onPrintRemoteCamera: (stream: MediaStream) => void
//   onPrintRemoteWindow: (stream: MediaStream) => void
//   openLocalCamera: (...args: any[]) => Promise<MediaStream | undefined>
//   openLocalWindow: (...args: any[]) => Promise<MediaStream | undefined>
// }) {
//   const state = reactive({
//     status: 'waiting' as WebRTCStatus,
//     userIdentity: 'unknown' as WebRTCIdentity,
//   })
//   createConnection({
//     ...configs,
//     onIdentityChange(identity) {
//       state.userIdentity = identity
//     },
//     onStatusChange(status) {
//       state.status = status
//     },
//   })
//   // TODO: 这个模式能不能单独拎出来做一个hooks？
//   watch(
//     () => state.userIdentity,
//     (identity, oldIdentity) => {
//       configs.onIdentityChange?.(identity, oldIdentity)
//     }
//   )
//   watch(
//     () => state.status,
//     (status, oldStatus) => {
//       configs.onStatusChange?.(status, oldStatus)
//     }
//   )
//   return state
// }
