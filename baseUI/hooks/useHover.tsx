import { createRefHook } from 'baseUI/functions'
import { IRefs } from 'baseUI/functions/mergeRefs'
import parseIRefs from 'baseUI/functions/parseRefs'
import { useEffect, useRef } from 'react'
import notExist from 'utils/functions/judgers/notExist'
import useToggle from './useToggle'

/**
 * props定义声明
 */
export interface UseHoverOptions {
  disable?: boolean
  /**
   * hover 开始（鼠标移入的瞬间）
   */
  onHoverStart?: (ev: { el: EventTarget; nativeEvent: PointerEvent }) => void
  /**
   * hover 结束（鼠标移出/取消的瞬间）
   */
  onHoverEnd?: (ev: { el: EventTarget; nativeEvent: PointerEvent }) => void
  /**
   * hoverStart + hoverEnd
   */
  onHover?: (ev: { el: EventTarget; nativeEvent: PointerEvent; now: 'start' | 'end' }) => void
}

export default function useHover(
  refs: IRefs<HTMLElement>,
  { disable = false, onHoverStart, onHoverEnd, onHover }: UseHoverOptions = {}
) {
  const eventRef = useRef<PointerEvent>()
  const [isHover, { on: turnonHover, off: turnoffHover }] = useToggle(false)

  useEffect(() => {
    const hoverStartHandler = (ev: PointerEvent) => {
      turnonHover()
      eventRef.current = ev
    }
    const hoverEndHandler = (ev: PointerEvent) => {
      turnoffHover()
      eventRef.current = ev
    }
    parseIRefs(refs, (cur) => {
      cur.addEventListener('pointerenter', hoverStartHandler)
      cur.addEventListener('pointerleave', hoverEndHandler)
      cur.addEventListener('pointercancel', hoverEndHandler)
    })
    return () => {
      parseIRefs(refs, (cur) => {
        cur.removeEventListener('pointerleave', hoverEndHandler)
        cur.removeEventListener('pointercancel', hoverEndHandler)
        cur.removeEventListener('pointerenter', hoverStartHandler)
      })
    }
  }, [disable])

  useEffect(() => {
    if (disable || notExist(eventRef.current)) return
    const targetCallback = isHover ? onHoverStart : onHoverEnd
    targetCallback?.({ el: eventRef.current.target!, nativeEvent: eventRef.current! })
    onHover?.({
      el: eventRef.current.target!,
      nativeEvent: eventRef.current!,
      now: isHover ? 'start' : 'end'
    })
  }, [disable, isHover, onHoverStart, onHoverEnd, onHover])

  return isHover
}

// compose style
export const useHoverRef = createRefHook(useHover)
