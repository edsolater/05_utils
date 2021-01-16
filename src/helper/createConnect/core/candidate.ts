const iceCandidatesCache: RTCIceCandidate[] = []
/**
 * 主播/观众通用
 * 发送candidate
 * @param info
 */
export function sendCandidates(info: {
  peerConnection: RTCPeerConnection
  action: (candidate: RTCIceCandidate) => void
}) {
  iceCandidatesCache.forEach((candidate) => {
    console.info('(WebRTC)RPOCESS: sending ice candidate', candidate)
    info.action(candidate)
  })
  iceCandidatesCache.splice(0, iceCandidatesCache.length)
}

/**
 * 主播/观众通用
 * 在设置了LocalDescription后，浏览器会自动创建一个candidate
 */
export function acceptIceCandidate(info: { peerConnection: RTCPeerConnection }) {
  info.peerConnection.addEventListener('icecandidate', (ev) => {
    if (ev.candidate) {
      iceCandidatesCache.push(ev.candidate)
    }
  })
}

/**
 * 主播/观众通用
 * 接收由后端传来的观众的对方的candidate
 */
export async function receiveIceCandidate(info: {
  peerConnection: RTCPeerConnection
  content: RTCIceCandidate
}) {
  console.info('(WebRTC)RPOCESS: 获得来自后端的candidate', info.content)
  info.peerConnection
    .addIceCandidate(info.content)
    .then(() => console.info('(WebRTC)RPOCESS: addIceCandidate 完毕'))
}
