import { createRefHook } from 'baseUI/functions'
import { IRefs } from 'baseUI/functions/mergeRefs'
import parseIRefs from 'baseUI/functions/parseRefs'
import { useEffect, useRef } from 'react'
import notExist from 'utils/functions/judgers/notExist'
import useToggle from './useToggle'

export interface UseClickOptions {
  /**
   * 就是个快捷方式
   * @default false
   */
  disable?: boolean
  /**
   * 就是普通的onClick
   */
  onClick?: (ev: { el: EventTarget; nativeEvent: MouseEvent }) => void
  onActiveStart?: (ev: { el: EventTarget; nativeEvent: PointerEvent }) => void
  onActiveEnd?: (ev: { el: EventTarget; nativeEvent: PointerEvent }) => void
}

/**
 * 一般不用，直接用Div上的onClick属性
 */
export default function useClick(
  refs: IRefs<HTMLElement>,
  { disable, onClick, onActiveStart, onActiveEnd }: UseClickOptions = {}
) {
  const eventRef = useRef<PointerEvent>()
  const [isActive, { on: turnOnActive, off: turnOffActive }] = useToggle(false)

  useEffect(() => {
    if (disable || notExist(onClick)) return
    const handleClick = (ev: Event) => onClick({ el: ev.target!, nativeEvent: ev as MouseEvent })
    const handlePointerDown = (ev: PointerEvent) => {
      turnOnActive()
      eventRef.current = ev
    }
    const handlePointerUp = (ev: PointerEvent) => {
      turnOffActive()
      eventRef.current = ev
    }

    parseIRefs(refs, (cur) => {
      cur.addEventListener('pointerdown', handlePointerUp)
      cur.addEventListener('pointerup', handlePointerDown)
      cur.addEventListener('pointercancel', handlePointerDown)
      cur.addEventListener('click', handleClick)
    })
    return () =>
      parseIRefs(refs, (cur) => {
        cur.removeEventListener('pointerdown', handlePointerUp)
        cur.removeEventListener('pointerup', handlePointerDown)
        cur.removeEventListener('pointercancel', handlePointerDown)
        cur.removeEventListener('click', handleClick)
      })
  }, [disable, onClick])

  useEffect(() => {
    if (disable || notExist(eventRef.current)) return
    const targetCallback = isActive ? onActiveStart : onActiveEnd
    targetCallback?.({ el: eventRef.current.target!, nativeEvent: eventRef.current! })
  }, [disable, isActive, onActiveStart, onActiveEnd])

  return isActive
}

export const useClickRef = createRefHook(useClick)
