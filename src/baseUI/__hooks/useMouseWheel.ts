import { RefObject, useEffect, useRef, useState } from 'react'

type CallbackInfo = {
  scrollDistance: number
}

/**
 * 监听元素上鼠标滚轮的滚动
 * @param ref 需要检测的元素
 * @param options
 * @returns hooks的结果
 */
export default function useMouseWheel(
  ref: RefObject<HTMLElement>,
  options?: {
    /**
     * 如此hooks无需返回，则使用Ref保存状态，而不是会触发重渲染的State
     * 此属性不可变动
     */
    noReturn?: boolean
    cb?: (info: CallbackInfo | { eventObject: WheelEvent }) => void
    //TODO: 间隔时间功能函数。 intervalTime: 300
  }
): CallbackInfo {
  // TODO: 感觉这种混合模式可以提取出来啊
  const [_, setForceScrollDistance] = options?.noReturn ? [] : useState(0) // 为了纯粹使用hooks时能触发重渲
  const scrollDistance = useRef(0)

  useEffect(() => {
    /**
     * 从鼠标滚轮事件中更新
     * @param ev 鼠标滚轮
     */
    const updateScroll = (ev: WheelEvent) => {
      setForceScrollDistance?.((oldDistance) => oldDistance + ev.pageY) // 为了纯粹使用hooks时能触发重渲
      scrollDistance.current += ev.pageY
      options?.cb?.({ eventObject: ev, scrollDistance: scrollDistance.current })
    }

    ref.current?.addEventListener('wheel', updateScroll)
    return () => ref.current?.removeEventListener('wheel', updateScroll)
  }, [options])

  return { scrollDistance: scrollDistance.current }
}

//IDEA： 还可以代替Div的.feature.ts
