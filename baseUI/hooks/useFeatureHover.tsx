import { RefObject, useEffect } from 'react'
import useToggle from './useToggle'

/**
 * props定义声明
 */
export interface FeatureHoverOptions {
  disable?: boolean
  /**
   * hover 开始（鼠标移入的瞬间）
   */
  onHoverStart?: (event: { el: HTMLElement; nativeEvent: PointerEvent }) => void
  /**
   * hover 结束（鼠标移出/取消的瞬间）
   */
  onHoverEnd?: (event: { el: HTMLElement; nativeEvent: PointerEvent }) => void
  /**
   * 与 onscroll一样，这是一个高频触发事件，尽量使用 onHover 或 onHoverStart 和 onHoverEnd  代替
   */
  onHovering?: (event: { el: HTMLElement; nativeEvent: PointerEvent }) => void
  /**
   * hover 的状态改变时触发
   */
  onHover?: (event: { el: HTMLElement; nativeEvent: PointerEvent; state: 'start' | 'end' }) => void
}

export function useFeatureHover(
  domRef: RefObject<HTMLElement>,
  { disable = false, onHoverStart, onHoverEnd, onHovering, onHover }: FeatureHoverOptions
) {
  const [isHover, { on, off }] = useToggle(false)
  useEffect(() => {
    if (disable) return
    if (onHoverStart || onHover) {
      const hoverStartHandler = (ev: PointerEvent) => {
        on()
        onHoverStart?.({ el: domRef.current!, nativeEvent: ev })
        onHover?.({ el: domRef.current!, nativeEvent: ev, state: 'start' })
      }
      domRef.current!.addEventListener('pointerenter', hoverStartHandler)
      return () => {
        domRef.current!.removeEventListener('pointerenter', hoverStartHandler)
      }
    }
  }, [disable, onHoverStart, onHover])

  useEffect(() => {
    if (disable) return
    if (onHoverEnd || onHover) {
      const hoverEndHandler = (ev: PointerEvent) => {
        off()
        onHoverEnd?.({ el: domRef.current!, nativeEvent: ev })
        onHover?.({ el: domRef.current!, nativeEvent: ev, state: 'end' })
      }
      domRef.current!.addEventListener('pointerleave', hoverEndHandler)
      domRef.current!.addEventListener('pointercancel', hoverEndHandler)
      return () => {
        domRef.current!.removeEventListener('pointerleave', hoverEndHandler)
        domRef.current!.removeEventListener('pointercancel', hoverEndHandler)
      }
    }
  }, [disable, onHoverEnd, onHover])

  useEffect(() => {
    if (disable) return
    if (onHovering) {
      const hoverHandler = (ev: PointerEvent) => 
        onHovering?.({ el: domRef.current!, nativeEvent: ev })
      
      domRef.current!.addEventListener('pointerover', hoverHandler) // TODO: 效果有待验证
      return () => {
        domRef.current!.removeEventListener('pointerover', hoverHandler) // TODO: 效果有待验证
      }
    }
  }, [disable, onHovering])
  return [isHover]
}
