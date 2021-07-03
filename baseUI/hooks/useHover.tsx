import { createRefHook } from 'baseUI/functions'
import { IRefs } from 'baseUI/functions/mergeRefs'
import parseIRefs from 'baseUI/functions/parseRefs'
import { useEffect, useRef } from 'react'
import { isExist } from 'utils/functions/judgers'
import useToggle from './useToggle'

/**
 * props定义声明
 */
export interface HoverOptions {
  disable?: boolean
  /**
   * hover 开始（鼠标移入的瞬间）
   */
  onHoverStart?: (event: { el: EventTarget; nativeEvent: PointerEvent }) => void
  /**
   * hover 结束（鼠标移出/取消的瞬间）
   */
  onHoverEnd?: (event: { el: EventTarget; nativeEvent: PointerEvent }) => void
}

export default function useHover(
  domRef: IRefs<HTMLElement>,
  { disable = false, onHoverStart, onHoverEnd }: HoverOptions = {}
) {
  const eventRef = useRef<PointerEvent>()
  const [isHover, { on: onHover, off: offHover }] = useToggle(false)

  useEffect(() => {
    const hoverStartHandler = (ev: PointerEvent) => {
      onHover()
      eventRef.current = ev
    }
    const hoverEndHandler = (ev: PointerEvent) => {
      offHover()
      eventRef.current = ev
    }
    parseIRefs(domRef, (cur) => {
      cur.addEventListener('pointerenter', hoverStartHandler)
      cur.addEventListener('pointerleave', hoverEndHandler)
      cur.addEventListener('pointercancel', hoverEndHandler)
    })
    return () => {
      parseIRefs(domRef, (cur) => {
        cur.removeEventListener('pointerleave', hoverEndHandler)
        cur.removeEventListener('pointercancel', hoverEndHandler)
        cur.removeEventListener('pointerenter', hoverStartHandler)
      })
    }
  }, [])

  useEffect(() => {
    if (isExist(eventRef.current) && !disable) {
      if (isHover) onHoverStart?.({ el: eventRef.current.target!, nativeEvent: eventRef.current! })
      if (!isHover) onHoverEnd?.({ el: eventRef.current.target!, nativeEvent: eventRef.current! })
    }
  }, [isHover])

  return isHover
}

// compose style
export const useHoverRef = createRefHook(useHover)
