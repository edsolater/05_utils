import { createRefHook } from 'baseUI/functions'
import parseIRefs, { parseIRefsWrapper } from 'baseUI/functions/parseRefs'
import { RefObject, useEffect, useRef } from 'react'
import isHTMLElement from 'utils/helper/domElement/isHTMLElement'
import useToggle from './useToggle'

/**
 * props定义声明
 */
export interface HoverOptions<El extends HTMLElement = HTMLDivElement> {
  disable?: boolean
  /**
   * hover 开始（鼠标移入的瞬间）
   */
  onHoverStart?: (event: { el: El; nativeEvent: PointerEvent }) => void
  /**
   * hover 结束（鼠标移出/取消的瞬间）
   */
  onHoverEnd?: (event: { el: El; nativeEvent: PointerEvent }) => void
}

export default function useHover<El extends HTMLElement = HTMLDivElement>(
  domRef: RefObject<El>,
  { disable = false, onHoverStart, onHoverEnd }: HoverOptions<El>
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
    if (domRef.current && eventRef.current && !disable) {
      if (isHover) onHoverStart?.({ el: domRef.current!, nativeEvent: eventRef.current! })
      if (!isHover) onHoverEnd?.({ el: domRef.current!, nativeEvent: eventRef.current! })
    }
  }, [isHover])

  return [isHover]
}

// compose style
export const useHoverRef = createRefHook(useHover)

