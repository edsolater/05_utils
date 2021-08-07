import { createRefHook, mergeProps } from 'baseUI/functions'
import { useToggle } from 'baseUI/hooks'
import React, { ReactNode, RefObject, useEffect, useRef } from 'react'
import notExist from '@edsolater/fnkit/dist/judgers/notExist'
import Ex, { ExProps } from './Ex'

//#region ------------------- hook: useClick -------------------
export interface UseClickOptions {
  disable?: boolean
  onClick?: (ev: { el: EventTarget; nativeEvent: MouseEvent }) => void
  onActiveStart?: (ev: { el: EventTarget; nativeEvent: PointerEvent }) => void
  onActiveEnd?: (ev: { el: EventTarget; nativeEvent: PointerEvent }) => void
}

export function useClick(
  ref: RefObject<HTMLElement>,
  { disable, onClick, onActiveStart, onActiveEnd }: UseClickOptions = {}
) {
  const eventRef = useRef<PointerEvent>()
  const [isActive, { on: turnOnActive, off: turnOffActive }] = useToggle(false)

  useEffect(() => {
    if (disable) return
    if (notExist(onClick)) return
    const handleClick = (ev: Event) => onClick({ el: ev.target!, nativeEvent: ev as MouseEvent })
    const handlePointerDown = (ev: PointerEvent) => {
      turnOnActive()
      eventRef.current = ev
    }
    const handlePointerUp = (ev: PointerEvent) => {
      turnOffActive()
      eventRef.current = ev
    }
    // TODO: assert ref is not empty
    ref.current?.addEventListener('pointerdown', handlePointerUp)
    ref.current?.addEventListener('pointerup', handlePointerDown)
    ref.current?.addEventListener('pointercancel', handlePointerDown)
    ref.current?.addEventListener('click', handleClick)
    return () => {
      ref.current?.removeEventListener('pointerdown', handlePointerUp)
      ref.current?.removeEventListener('pointerup', handlePointerDown)
      ref.current?.removeEventListener('pointercancel', handlePointerDown)
      ref.current?.removeEventListener('click', handleClick)
    }
  }, [disable])

  useEffect(() => {
    if (disable || notExist(eventRef.current)) return
    const targetCallback = isActive ? onActiveStart : onActiveEnd
    targetCallback?.({ el: eventRef.current.target!, nativeEvent: eventRef.current! })
  }, [disable, isActive, onActiveStart, onActiveEnd])

  return isActive
}

export const useClickRef = createRefHook(useClick)

//#endregion

export interface AttachClickableProps extends UseClickOptions {
  children?: ReactNode
}

export interface AttachClickableInjectProps {
  isActive?: boolean
}

export const htmlAttributes = []

/**
 * @WrapperComponent make it child clickable (it's a hollowComponent)
 */
export default function AttachClickable({
  children,
  onClick,
  onActiveStart,
  onActiveEnd,
  ...restProps
}: AttachClickableProps) {
  const [clickRef, isActive] = useClickRef({ onClick, onActiveStart, onActiveEnd })
  return (
    <Ex
      {...mergeProps<any, ExProps>(restProps, {
        isActive,
        domRef: clickRef,
        css: {
          cursor: 'pointer',
          userSelect: 'none',
          transition: '75ms',
          ':active': {
            backdropFilter: 'brightness(.75)',
            filter: 'brightness(.9)',
            transform: 'scale(.95)' // should use atomic JSS to customize it
          }
        }
      })}
    >
      {children}
    </Ex>
  )
}
