import { ID, URL } from 'typings/constants'
import deepJSONParse from 'utils/string/deepJSONParse'
let websocketId = 1

// 向后端发送消息
type WebsocketSend<Commands extends { [command: string]: any }> = <C extends keyof Commands>(
  command: C,
  payload: Commands[C]
) => void

// 从后端接收消息
type AddWebsockMessageListener<Commands extends { [command: string]: any }> = (
  messageListener: (info: {
    message: { command: keyof Commands; payload: Commands[keyof Commands] }
    send: WebsocketSend<Commands>
  }) => void
) => void

interface WebsocketListeners<Commands extends { [command: string]: any }> {
  onOpen?: (info: { send: WebsocketSend<Commands> }) => void
  onClose?: (info: { send: WebsocketSend<Commands> }) => void
  onError?: (info: { send: WebsocketSend<Commands> }) => void
}

/**
 * 脏函数
 * 创建一条websocket
 * @param url 建立此调websocket的地址
 */
export function createWebsocket<Commands extends { [command: string]: any } = {}>({
  url,
  label = '',
  onOpen,
  onClose,
  onError
}: {
  /* 强行规定websocket的后端地址 */
  url: URL
  /* 用于标识某条websocket */
  label?: string
} & WebsocketListeners<Commands>): {
  websocket: WebSocket
  websocketSend: WebsocketSend<Commands>
  addMessageListener: AddWebsockMessageListener<Commands>
} {
  console.info(`ACTION: 新建立一条websocket`)
  const websocket = new WebSocket(url)
  const currentWebsocketId: ID = String(websocketId++)
  const websocketSend: WebsocketSend<Commands> = (command, payload) => {
    // todo: 是否用JSON来传输，应该要能自定义成可用typedArray
    websocket.send(JSON.stringify({ command, payload }))
    console.info(`ACTION: 通过websocket(${label || currentWebsocketId}发送消息：`, {
      command,
      payload
    })
  }
  const addMessageListener: AddWebsockMessageListener<Commands> = messageListener => {
    websocket.addEventListener('message', ev => {
      const message = deepJSONParse(ev.data)
      console.info(`PROCESS: websocket收到信息`, message)
      messageListener({ message, send: websocketSend })
    })
  }
  websocket.addEventListener('open', ev => {
    console.info(`PROCESS: websocket连接成功`, ev)
    onOpen?.({ send: websocketSend })
  })
  websocket.addEventListener('close', ev => {
    console.warn(`PROCESS: websocket连接关闭`, ev)
    onClose?.({ send: websocketSend })
  })
  websocket.addEventListener('error', ev => {
    console.warn(`PROCESS: websocket出错`, ev)
    onError?.({ send: websocketSend })
  })
  return { websocket, addMessageListener, websocketSend }
}
