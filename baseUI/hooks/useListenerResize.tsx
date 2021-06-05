import { RefObject, useEffect } from 'react'
type Callback = (entry: ResizeObserverEntry) => void
type IndexInCallback = number

let elementResizeObserver: ResizeObserver | null = null

const callbackStack: Array<Callback | undefined> = []

const pushCallbackToStack = (callback: Callback): IndexInCallback => {
  callbackStack.push(callback)
  return callbackStack.length - 1
}
const clearCallbackByIndex = (index: number) => {
  callbackStack[index] = undefined
}

const getElementResizeObserver = () => {
  if (elementResizeObserver) return elementResizeObserver
  elementResizeObserver = new ResizeObserver((entries) => {
    entries.every((entry) => {
      callbackStack.every((callback) => {
        if (callback) callback(entry)
      })
    })
  })
  return elementResizeObserver
}

/**
 * props定义声明
 */
export interface ListenerResizeOptions {
  disable?: boolean
  /**
   * 元素改变自生大小时调用（因为使用ResizeObserver，所以是异步的）
   */
  onResize?: ({ el, entry }: { el: HTMLElement; entry: ResizeObserverEntry }) => void
}
export const featureProps = ['onResize'] as const

export function useListenerResize(
  domRef: RefObject<HTMLElement>,
  { disable = false, onResize }: ListenerResizeOptions = {}
) {
  useEffect(() => {
    if (disable) return
    if (!onResize) return
    // 因为这个ResizeObserver是维护在文件里的，最多只会加载一次
    const resizeObserver = getElementResizeObserver()
    resizeObserver.observe(domRef.current!)
    const callbackIndex = pushCallbackToStack((entry) => onResize?.({ el: domRef.current!, entry }))
    return () => clearCallbackByIndex(callbackIndex)
  }, [onResize])
}
