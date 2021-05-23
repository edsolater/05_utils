import addDefault from 'utils/object/addDefault'

/**
 * 捕获桌面或窗口
 * 注意：标准规定必须由用户触发（点击了某个按钮后触发回调时触发这个函数）
 * @param constraints 捕获的参数
 */
export async function evokeWindow(
  constraints: MediaStreamConstraints = {}
): Promise<MediaStream | undefined> {
  addDefault(constraints, { video: true, audio: true })
  try {
    //@ts-ignore
    return window.navigator.mediaDevices.getDisplayMedia(constraints)
  } catch (e) {
    return undefined
  }
}

/**
 * 捕获摄像头与麦克风
 * @param constraints 捕获的参数
 */
export async function evokeCamera(
  constraints: MediaStreamConstraints = {}
): Promise<MediaStream | undefined> {
  addDefault(constraints, { video: true, audio: true })
  try {
    return window.navigator.mediaDevices.getUserMedia(constraints)
  } catch (e) {
    return undefined
  }
}

/**
 * 捕获麦克风
 * @param constraints 捕获的参数
 */
export async function evokeMicrophone(
  constraints: Pick<MediaStreamConstraints, 'audio'> = { audio: true }
): Promise<MediaStream | undefined> {
  addDefault(constraints, { audio: true })
  try {
    return window.navigator.mediaDevices.getUserMedia(constraints)
  } catch (e) {
    return undefined
  }
}
