export interface LoadSpeed {
  getDownloadSpeed(): number
  getUploadSpeed(): number
}
export function getNetworkSpeed(peerConnection: RTCPeerConnection): LoadSpeed {
  const receivers = peerConnection.getReceivers()
  let speed = 1.2
  return {
    getDownloadSpeed: () => 1,
    /* peerConnection.getReceivers.bind(peerConnection), */ getUploadSpeed: () => speed++
  }
}
