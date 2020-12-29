import addDefault from 'functions/magic/addDefault'
import { EventBus } from './config'

type EventNames = keyof EventBus
type EventArgs<N extends keyof EventBus = keyof EventBus> = Parameters<EventBus[N]>
type EventListener<N extends keyof EventBus = keyof EventBus> = EventBus[N]
type EventConfig = {
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
/**
 * 用于存储由`on()`传入的listeners
 */
const listenerMap: Map<EventNames, Map<EventListener, EventConfig>> = new Map()
/**
 * 用户储存已emit的事件
 */
const emitMap: Map<EventNames, EventArgs> = new Map()
/**
 * 带副作用
 * 在eventBus上注册事件回调
 * @param eventName 事件名
 * @param callback 事件回调
 */
export function on<T extends EventNames>(
  eventName: T,
  callback: EventListener<T>,
  initConfig: EventConfig = {}
) {
  const config = addDefault(initConfig, { flush: 'pre' })
  recordListener({ eventName, callback, config })
  if (config.flush === 'pre' && emitMap.has(eventName))
    evokeListener({ eventName, callback, eventArgs: emitMap.get(eventName) as EventArgs<T> })
}

/**
 * @see {removeListener}
 */
export function remove(...args: Parameters<typeof removeListener>) {
  return removeListener(...args)
}

/**
 * 带副作用
 * 在eventBus上触发事件
 * @param eventName 事件名
 * @param eventArgs 事件的参数
 */
export function emit<T extends EventNames>(eventName: T, ...eventArgs: EventArgs<T>) {
  emitMap.set(eventName, eventArgs)
  evokeListener({ eventName, eventArgs })
}

/**
 * 副作用
 * 调用函数（会依照配置，对函数进行处理）
 * @param eventName 要触发的函数的名称
 * @param callback 要触发的函数（若没定义）
 * @param eventArgs 事件的参数
 */
function evokeListener<T extends EventNames>(listener: {
  eventName: T
  callback?: EventListener<T>
  eventArgs: EventArgs<T>
}) {
  if (listener.callback) {
    //@ts-expect-error
    listener.callback(...listener.eventArgs)
    const config = listenerMap.get(listener.eventName)?.get(listener.callback)
    if (config?.once) {
      listenerMap.get(listener.eventName)?.delete(listener.callback)
    }
  } else {
    listenerMap.get(listener.eventName)?.forEach((_config, callback) => {
      evokeListener({
        eventName: listener.eventName,
        //@ts-expect-error
        callback,
        eventArgs: listener.eventArgs
      })
    })
  }
}

/**
 * 副作用
 * 记录下注册的listener
 * @param eventName 事件名
 * @param cb 事件回调函数
 * @param config 附带配置
 */
function recordListener<T extends EventNames>(listener: {
  eventName: T
  callback: EventListener<T>
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
function removeListener(listener: { eventName: EventNames; callback: EventListener }) {
  return listenerMap.get(listener.eventName)?.delete(listener.callback) ?? false
}
