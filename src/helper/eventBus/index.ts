import { addDefaultMutably } from '../../functions/magic/addDefault'

export type EventListener = (...args: any[]) => void
export type EventConfig = {
  /**
   * 只调用一次，然后在eventBus上删除。
   */
  once?: boolean
  /**
   * 之前emit的也有反应
   * pre - 如之前有emit过相关事件，则立刻调用【默认】
   */
  flush?: 'pre' | 'normal'
}
type EventNames = string
type EventPayload = any
/**
 * 用于存储由`on()`传入的listeners
 */
const listenerMap: Map<EventNames, Map<EventListener, EventConfig>> = new Map()
/**
 * 用户储存已emit的事件
 */
const emitMap: Map<EventNames, EventPayload> = new Map()

/**
 * 带副作用
 * 在eventBus上注册事件回调
 * @param eventName 事件名
 * @param callback 事件回调
 */
export function on(eventName: EventNames, callback: EventListener, config: EventConfig = {}) {
  addDefaultMutably(config, { flush: 'pre' })
  recordListener({ eventName, callback, config })
  if (config.flush === 'pre' && emitMap.has(eventName))
    evokeListener({ eventName, callback, config, eventArgs: emitMap.get(eventName) })
}

/**
 * @see removeListener
 */
export const remove = removeListener
/**
 * 带副作用
 * 在eventBus上触发事件
 * @param eventName 事件名
 * @param eventArgs 事件的参数
 */
export function emit(eventName: EventNames, ...eventArgs: any[]) {
  emitMap.set(eventName, eventArgs)
  evokeByEventName({ eventName, eventArgs })
}

/**
 * 副作用
 * 调用某eventName下的所有函数（会依照配置，对函数进行处理）
 * @param fn 要触发的函数
 * @param options 用户对事件的配置
 * @param eventArgs 事件的参数
 * @todo 感觉能与 `evokeListener` 合并
 */
function evokeByEventName(listener: { eventName: EventNames; eventArgs: any[] }) {
  listenerMap.get(listener.eventName)?.forEach((config, callback) => {
    evokeListener({
      eventName: listener.eventName,
      callback,
      eventArgs: listener.eventArgs,
      config
    })
  })
}
/**
 * 副作用
 * 调用函数（会依照配置，对函数进行处理）
 * @param fn 要触发的函数
 * @param options 用户对事件的配置
 * @param eventArgs 事件的参数
 */
function evokeListener(listener: {
  eventName: EventNames
  callback: EventListener
  eventArgs: any[]
  config: EventConfig
}) {
  listener.callback(...listener.eventArgs)
  if (listener.config.once) {
    listenerMap.get(listener.eventName)?.delete(listener.callback)
  }
}

/**
 * 副作用
 * 记录下注册的listener
 * @param eventName 事件名
 * @param cb 事件回调函数
 * @param config 附带配置
 */
function recordListener(listener: {
  eventName: string
  callback: EventListener
  config: Partial<EventConfig>
}) {
  if (listenerMap.has(listener.eventName)) {
    listenerMap.get(listener.eventName)!.set(listener.callback, listener.config)
  } else {
    listenerMap.set(listener.eventName, new Map([[listener.callback, listener.config]]))
  }
}

/**
 * 带副作用
 * 删除在eventBus上注册的事件回调
 * @param eventName 事件名
 * @param fn 事件回调
 * @returns 是否成功删除
 */
export function removeListener(listener: { eventName: EventNames; callback: EventListener }) {
  return listenerMap.get(listener.eventName)?.delete(listener.callback) ?? false
}
