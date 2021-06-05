import { RefObject, useEffect } from 'react'

export interface ListenerClickOptions {
  disable?: boolean
  /**
   * 就是普通的onClick
   */
  onClick?: (ev: { el: HTMLElement; nativeEvent: MouseEvent }) => void
}

/**
 * 一般不用，直接用Div上的onClick属性
 */
export default function useListenerClick(
  domRef: RefObject<HTMLElement>,
  { disable = false, onClick }: ListenerClickOptions
) {
  useEffect(() => {
    if (disable || !onClick) return
    const whenClickInside = (e: Event) =>
      onClick({ el: domRef.current!, nativeEvent: e as MouseEvent })
    domRef.current!.addEventListener('click', whenClickInside, { passive: true })
    return () => domRef.current!.removeEventListener('click', whenClickInside)
  }, [disable, onClick])
}
