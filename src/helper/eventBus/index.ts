export type EventListener = (...args: any[]) => void
export type IEventOptions = {
  /**
   * 只调用一次，然后在eventBus上删除。
   */
  once?: boolean
  /**
   * 之前emit的也有反应
   */
  affactPrev?: boolean
}
type EventNames = string
type EventPayload = any
const eventListeners: Map<EventNames, Map<EventListener, IEventOptions>> = new Map()
const emitedEvents: Map<EventNames, EventPayload> = new Map()

/**
 * 在eventBus上注册事件回调
 * @param eventName 事件名
 * @param fn 事件回调
 */
export function on(
  eventName: EventNames,
  fn: EventListener,
  { once, affactPrev = true }: IEventOptions = {}
) {
  eventListeners.set(
    eventName,
    (eventListeners.get(eventName) ?? new Map()).set(fn, { once, affactPrev })
  )
  if (affactPrev && emitedEvents.has(eventName))
    invokeEvent(fn, emitedEvents.get(eventName), { once, affactPrev }, eventName)
}

/**
 * 在eventBus上注册事件回调
 * @param eventName 事件名
 * @param fn 事件回调
 * @todo 要把这个干掉，可能使用弱引用，智能依赖收集
 */
export function remove(eventName: EventNames, fn: EventListener) {
  eventListeners.get(eventName)?.delete(fn)
}

/**
 * 在eventBus上触发事件/
 * @param eventName 事件名
 * @param eventArgs 事件的参数
 */
export function emit(eventName: EventNames, ...eventArgs: any[]) {
  emitedEvents.set(eventName, eventArgs)
  eventListeners.get(eventName)?.forEach((options, fn) => {
    invokeEvent(fn, eventArgs, options, eventName)
  })
}

/**
 * 调用函数（会依照配置，对函数进行处理）
 * @param fn 要触发的函数
 * @param options 用户对事件的配置
 * @param eventArgs 事件的参数
 */
function invokeEvent(
  fn: EventListener,
  eventArgs: any[],
  options: IEventOptions,
  eventName: EventNames
) {
  fn(...eventArgs)
  if (options.once) {
    eventListeners.get(eventName)?.delete(fn)
  }
}
