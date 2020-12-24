/**********
 * 还没经过实战的检验
 ***********/
import { ID, URL } from 'typings/typeConstants'

let websocketId = 0
const pool = new Map<ID, WebSocket>()
interface WebSocketController<Commands extends { [command: string]: any } = {}> {
  readonly id: ID
  readonly label: string
  readonly state: 'CONNECTING' | 'OPEN' | 'CLOSING' | 'CLOSED'
  readonly original: WebSocket
  send<C extends keyof Commands>(command: C, payload: Commands[C]): void
  close(): void
}

/**
 * 脏函数
 * 创建一条websocket
 * @param url 建立此调websocket的地址
 */
export function createWebsocket<T extends { [command: string]: any } = {}>(
  url: URL,
  {
    label = '',
    onMessage = () => {},
    onOpen,
    onClose,
    onError
  }: {
    /* 用于标识某条websocket */
    label?: string
    onMessage?: (ws: WebSocket, event: MessageEvent) => void
    onOpen?: (ws: WebSocket, event: Event) => void
    onClose?: (ws: WebSocket, event: Event) => void
    onError?: (ws: WebSocket, event: Event) => void
  } = {}
) {
  const websocket = new WebSocket(url)
  const id: ID = String(websocketId++)
  pool.set(id, websocket)
  websocket.addEventListener('open', ev => {
    console.info(`PROCESS: websocket连接成功 ${ev}`)
    onOpen?.(websocket, ev)
  })
  websocket.addEventListener('close', ev => {
    console.info(`PROCESS: websocket连接关闭 ${ev}`)
    onClose?.(websocket, ev)
  })
  websocket.addEventListener('error', ev => {
    console.info(`PROCESS: websocket出错 ${ev}`)
    onError?.(websocket, ev)
  })
  websocket.addEventListener('message', ev => {
    console.info(`PROCESS: websocket收到信息 ${ev}`)
    onMessage(websocket, ev)
  })
  const webSocketController: WebSocketController<T> = {
    id,
    label,
    get state() {
      const stateNumber = websocket.readyState
      return {
        0: 'CONNECTING',
        1: 'OPEN',
        2: 'CLOSING',
        3: 'CLOSED'
      }[stateNumber]
    },
    original: websocket,
    send(command, payload) {
      // todo: 是否用JSON来传输，应该能自定义
      websocket.send(JSON.stringify({ command, payload }))
    },
    close() {
      deleteWebsocket(id)
    }
  }
  return webSocketController
}

/**
 * 脏函数
 * 按照 id 删除websocket
 * @param id websocket 的 ID
 */
export function deleteWebsocket(id: ID): boolean {
  const websocket = pool.get(id)
  if (websocket) {
    websocket.close()
    pool.delete(id)
    return true
  } else {
    return false
  }
}

/**
 * 脏函数
 * 返回该应用中存在的websocket的数量
 */
export function getExistedWebsockCount() {
  return pool.size
}
