import { createRefHook, mergeProps } from 'baseUI/functions'
import { useToggle } from 'baseUI/hooks'
import React, { ReactNode, RefObject, useEffect, useRef } from 'react'
import notExist from 'utils/functions/judgers/notExist'
import Ex, { ExProps } from './Ex'

//#region ------------------- hook: useHover() -------------------
export interface UseHoverOptions {
  disable?: boolean
  onHoverStart?: (ev: { el: EventTarget; nativeEvent: PointerEvent }) => void
  onHoverEnd?: (ev: { el: EventTarget; nativeEvent: PointerEvent }) => void
  onHover?: (ev: { el: EventTarget; nativeEvent: PointerEvent; now: 'start' | 'end' }) => void
}

export function useHover(
  ref: RefObject<HTMLElement>,
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
    // TODO: assert ref is not empty
    ref.current?.addEventListener('pointerenter', hoverStartHandler)
    ref.current?.addEventListener('pointerleave', hoverEndHandler)
    ref.current?.addEventListener('pointercancel', hoverEndHandler)
    return () => {
      ref.current?.removeEventListener('pointerleave', hoverEndHandler)
      ref.current?.removeEventListener('pointercancel', hoverEndHandler)
      ref.current?.removeEventListener('pointerenter', hoverStartHandler)
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

export const useHoverRef = createRefHook(useHover) // compose style
//#endregion

export interface AttachHoverableProps extends UseHoverOptions {
  children?: ReactNode
}

export interface AttachHoveableInjectProps {
  isHovered?: boolean
}

export const htmlAttributes = []

/**
 * @WrapperComponent make it child hoverable (it's a hollowComponent)
 */
export default function AttachHoverable({
  children,
  onHover,
  onHoverStart,
  onHoverEnd,
  ...restProps
}: AttachHoverableProps) {
  const [hoverRef, isHovered] = useHoverRef({ onHover, onHoverStart, onHoverEnd })
  return (
    <Ex
      {...mergeProps<any, ExProps>(restProps, {
        isHovered,
        domRef: hoverRef,
        css: {
          ':hover': {
            filter: 'brightness(.8)',
            backdropFilter:
              'brightness(.98)' /* IDEA: use css Houdini to and second background (wrapperBackground) */
          }
        }
      })}
    >
      {children}
    </Ex>
  )
}
