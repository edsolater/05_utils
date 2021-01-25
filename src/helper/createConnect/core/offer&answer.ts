/**
 * 创建offer后通知后端
 * （创建offer的会由浏览器自动创建candidate）
 * （创建offer的同时，创建dataChannel）
 */
export async function createRTCOffer(info: {
  peerConnection: RTCPeerConnection
  offerOptions: RTCOfferOptions
}) {
  const offer = await info.peerConnection.createOffer(info.offerOptions)
  await info.peerConnection.setLocalDescription(offer)
  console.info('setLocalDescription 完毕')
  return offer
}

/**
 * 接收后端传来的主播的Offer
 */
export async function receiveRTCOffer(info: {
  peerConnection: RTCPeerConnection
  content: RTCSessionDescriptionInit
}): Promise<void> {
  const offer = info.content
  await info.peerConnection.setRemoteDescription(offer)
  console.log('(WebRTC)RPOCESS: setRemoteDescription 完毕')
}

/**
 * 创建answer
 */
export async function createRTCAnswer(info: {
  peerConnection: RTCPeerConnection
  offerOptions: RTCOfferOptions
}) {
  const answer = await info.peerConnection.createAnswer(info.offerOptions)
  await info.peerConnection
    .setLocalDescription(answer)
    .then(() => console.info('(WebRTC)RPOCESS: setLocalDescription 完毕'))
  return answer
}

/**
 * 主播/观众通用
 * 接收由后端传来的观众的answer
 */
export async function receiveRTCAnswer(info: {
  peerConnection: RTCPeerConnection
  content: RTCSessionDescriptionInit
}) {
  console.info('(WebRTC)RPOCESS: receive backend ANSWER')
  await info.peerConnection.setRemoteDescription(info.content)
  console.info('(WebRTC)RPOCESS: setRemoteDescription 完毕')
}
