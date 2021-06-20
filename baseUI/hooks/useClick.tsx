import { RefObject, useEffect } from 'react'

export interface UseClickOptions<El extends HTMLElement = HTMLDivElement> {
  /**
   * 就是个快捷方式
   * @default false
   */
  disable?: boolean
  /**
   * 就是普通的onClick
   */
  onClick?: (ev: { el: El; nativeEvent: MouseEvent }) => void
}

/**
 * 一般不用，直接用Div上的onClick属性
 */
export default function useClick<El extends HTMLElement = HTMLDivElement>(
  domRef: RefObject<El>,
  { disable, onClick }: UseClickOptions<El>
) {
  useEffect(() => {
    if (disable || !onClick) return
    const whenClickInside = (e: Event) =>
      onClick({ el: domRef.current!, nativeEvent: e as MouseEvent })
    domRef.current!.addEventListener('click', whenClickInside, { passive: true })
    return () => domRef.current!.removeEventListener('click', whenClickInside)
  }, [disable, onClick])
}
