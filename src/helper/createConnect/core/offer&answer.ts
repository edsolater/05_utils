/**
 * 创建offer后通知后端
 * （创建offer的会由浏览器自动创建candidate）
 * （创建offer的同时，创建dataChannel）
 */
export async function createRTCOffer({
  peerConnection,
  offerOptions
}: {
  peerConnection: RTCPeerConnection
  offerOptions: RTCOfferOptions
}) {
  const offer = await peerConnection.createOffer(offerOptions)
  await peerConnection.setLocalDescription(offer)
  console.info('setLocalDescription 完毕')
  return offer
}

/**
 * 接收后端传来的主播的Offer
 */
export async function receiveRTCOffer({
  peerConnection,
  content
}: {
  peerConnection: RTCPeerConnection
  content: RTCSessionDescriptionInit
}): Promise<void> {
  const offer = content
  await peerConnection.setRemoteDescription(offer)
  console.log('【webRTC】 setRemoteDescription 完毕')
}

/**
 * 创建answer
 */
export async function createRTCAnswer({
  peerConnection,
  offerOptions
}: {
  peerConnection: RTCPeerConnection
  offerOptions: RTCOfferOptions
}) {
  const answer = await peerConnection.createAnswer(offerOptions)
  await peerConnection
    .setLocalDescription(answer)
    .then(() => console.info('【webRTC】 setLocalDescription 完毕'))
  return answer
}

/**
 * 主播/观众通用
 * 接收由后端传来的观众的answer
 */
export async function receiveRTCAnswer({
  peerConnection,
  content
}: {
  peerConnection: RTCPeerConnection
  content: RTCSessionDescriptionInit
}) {
  console.info('【webRTC】 receive backend ANSWER')
  await peerConnection.setRemoteDescription(content)
  console.info('【webRTC】 setRemoteDescription 完毕')
}
