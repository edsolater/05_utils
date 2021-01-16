/**********
 * 还没经过实战的检验
 ***********/

import { ID, URL } from 'typings/constantss'
import deepJSONParse  from 'utils/string/deepJSONParse'

export interface WebSocketController<Commands extends { [command: string]: any } = {}> {
  readonly id: ID
  readonly label: string
  readonly state: 'CONNECTING' | 'OPEN' | 'CLOSING' | 'CLOSED'
  readonly original: WebSocket
  send<C extends keyof Commands>(command: C, payload: Commands[C]): void
  close(): void
}

let websocketId = 1
const pool = new Map<ID, WebSocketController>()

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
    onError,
    only: maxOne,
  }: {
    /* 用于标识某条websocket */
    label?: string
    onMessage?: (
      message: { command: keyof T; payload: T[keyof T] },
      methods: Pick<WebSocketController<T>, 'send' | 'close'>
    ) => void
    onOpen?: (
      ws: WebSocket,
      methods: Pick<WebSocketController<T>, 'send' | 'close'>,
      event: Event
    ) => void
    onClose?: (
      ws: WebSocket,
      methods: Pick<WebSocketController<T>, 'send' | 'close'>,
      event: Event
    ) => void
    onError?: (
      ws: WebSocket,
      methods: Pick<WebSocketController<T>, 'send' | 'close'>,
      event: Event
    ) => void
    /* 只能一条websocket链接 */
    only?: boolean
  } = {}
): WebSocketController<T> {
  if (maxOne && pool.size === 1) {
    console.warn(`websocket: 试图重复创建websocket，但因为设置了onlyOne，无效`)
    // @ts-ignore
    return pool.get(Array.from(pool.keys())[0])
  } else {
    console.info(`ACTION: 新建立一条websocket`)
    const websocket = new WebSocket(url)
    const id: ID = String(websocketId++)
    const methods = {
      send(command, payload) {
        // todo: 是否用JSON来传输，应该要能自定义成可用typedArray
        websocket.send(JSON.stringify({ command, payload }))
        console.info(`ACTION: 通过${label || id}(websocket)发送消息：`, { command, payload })
      },
      close() {
        deleteWebsocket(id)
      },
    }
    websocket.addEventListener('open', (ev) => {
      console.info(`PROCESS: websocket连接成功`, ev)
      onOpen?.(websocket, methods, ev)
    })
    websocket.addEventListener('close', (ev) => {
      console.warn(`PROCESS: websocket连接关闭`, ev)
      onClose?.(websocket, methods, ev)
    })
    websocket.addEventListener('error', (ev) => {
      console.warn(`PROCESS: websocket出错`, ev)
      onError?.(websocket, methods, ev)
    })
    websocket.addEventListener('message', (ev) => {
      const message = deepJSONParse(ev.data)
      console.info(`PROCESS: websocket收到信息`, message)
      onMessage(message, methods)
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
          3: 'CLOSED',
        }[stateNumber]
      },
      original: websocket,
      ...methods,
    }
    pool.set(id, webSocketController)
    return webSocketController
  }
}

/**
 * 脏函数
 * 按照 id 删除websocket
 * @param id websocket 的 ID
 */
export function deleteWebsocket(id: ID): boolean {
  const webSocketController = pool.get(id)
  if (webSocketController) {
    webSocketController.original.close()
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
export function getAmount(): number {
  return pool.size
}
