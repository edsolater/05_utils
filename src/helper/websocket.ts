import { ID, URL } from 'typings/constants'
import deepJSONParse from 'utils/string/deepJSONParse'
let websocketId = 1
// websocket message 的定义类型的格式
type WebsocketMessageTypeFormat = { [command: string]: any }

// websocket message 的格式
export type WebsocketMessageRuntimeFormat<Commands, T = keyof Commands> = T extends keyof Commands
  ? { command: T; payload: Commands[T] }
  : never

// 向后端发送消息的 send方法
export type WebsocketSend<Commands extends WebsocketMessageTypeFormat> = <C extends keyof Commands>(
  command: C,
  payload: Commands[C]
) => void

// 监听来自后端的消息的 addWebsockMessageListener 方法
export type AddWebsockMessageListener<Commands extends WebsocketMessageTypeFormat> = (
  messageListener: (info: {
    message: WebsocketMessageRuntimeFormat<Commands>
    send: WebsocketSend<Commands>
  }) => void
) => void

// 初始化时websocket所能接收的listeners
interface WebsocketListeners<Commands extends WebsocketMessageTypeFormat> {
  onBeforeOpen?: () => Promise<void> | void
  onOpen?: (info: { send: WebsocketSend<Commands> }) => void
  onClose?: (info: { send: WebsocketSend<Commands> }) => void
  onError?: (info: { send: WebsocketSend<Commands> }) => void
  onMessage?: (info: {
    message: WebsocketMessageRuntimeFormat<Commands>
    send: WebsocketSend<Commands>
    addMessageListener: AddWebsockMessageListener<Commands>
  }) => void
}

/**
 * 脏函数
 * 创建一条websocket
 * @param url 建立此调websocket的地址
 * @async
 */
export async function createWebsocket<Commands extends WebsocketMessageTypeFormat = {}>({
  url,
  label = '',
  onBeforeOpen,
  onOpen,
  onClose,
  onError,
  onMessage
}: {
  /* 强行规定websocket的后端地址 */
  url: URL
  /* 用于标识某条websocket */
  label?: string
} & WebsocketListeners<Commands>): Promise<{
  websocket: WebSocket
  websocketSend: WebsocketSend<Commands>
  addMessageListener: AddWebsockMessageListener<Commands>
}> {
  await onBeforeOpen?.()
  const websocket = new WebSocket(url)
  const currentWebsocketId: ID = String(websocketId++)
  console.info(`✨【websocket(${label || currentWebsocketId})】新建`)
  const websocketSend: WebsocketSend<Commands> = (command, payload) => {
    // todo: 是否用JSON来传输，应该要能自定义成可用typedArray
    websocket.send(JSON.stringify({ command, payload }))
    console.info(`📤【websocket(${label || currentWebsocketId})】发送消息：`, {
      command,
      payload
    })
  }
  const addMessageListener: AddWebsockMessageListener<Commands> = messageListener => {
    websocket.addEventListener('message', ev => {
      const message = deepJSONParse(ev.data)
      messageListener({ message, send: websocketSend })
    })
  }
  websocket.addEventListener('open', ev => {
    console.info(`🥳【websocket(${label || currentWebsocketId})】连接成功`, ev)
    onOpen?.({ send: websocketSend })
  })
  websocket.addEventListener('close', ev => {
    console.warn(`😨【websocket(${label || currentWebsocketId})】连接关闭`, ev)
    onClose?.({ send: websocketSend })
  })
  websocket.addEventListener('error', ev => {
    console.error(`🐛【websocket(${label || currentWebsocketId})】出错`, ev)
    onError?.({ send: websocketSend })
  })
  websocket.addEventListener('message', ev => {
    const message = deepJSONParse(ev.data)
    console.info(`📬【websocket(${label || currentWebsocketId})】收到信息`, message)
    onMessage?.({ message, send: websocketSend, addMessageListener })
  })
  return { websocket, addMessageListener, websocketSend }
}
