import { useEffect } from 'react'
import { TagMap } from './TagMap'
type Callback = (entry: ResizeObserverEntry) => void
type IndexInCallback = number

const callbackStack: Array<Callback | undefined> = []
let elementResizeObserver: ResizeObserver | null = null

const pushCallbackToStack = (callback: Callback): IndexInCallback => {
  callbackStack.push(callback)
  return callbackStack.length - 1
}
const clearCallbackByIndex = (index: number) => {
  callbackStack[index] = undefined
}

const createElementResizeObserver = () => {
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
export interface FeatureProps<TagName extends keyof TagMap = 'div'> {
  /**
   * 元素改变自生大小时调用（因为使用ResizeObserver，所以是异步的）
   */
  onResize?: ({ el, entry }: { el: TagMap[TagName]; entry: ResizeObserverEntry }) => void
}
export const featureProps = ['onResize'] as const

/** @mutable 具体实现  */
export function useFeature<TagName extends keyof TagMap = 'div'>(
  { onResize }: FeatureProps<TagName>,
  { domRef }: { domRef: React.MutableRefObject<TagMap[TagName] | undefined> }
) {
  useEffect(() => {
    if (onResize) {
      // 因为这个ResizeObserver是维护在文件里的，最多只会加载一次
      const resizeObserver = elementResizeObserver || createElementResizeObserver()
      resizeObserver.observe(domRef.current!)
      const callbackIndex = pushCallbackToStack((entry) => {
        onResize?.({ el: domRef.current!, entry })
      })
      return () => {
        clearCallbackByIndex(callbackIndex)
      }
    }
  }, [onResize])
}
