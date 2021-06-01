import { ScrollEvent } from 'baseUI/Scroll/_interface'
import { MutableRefObject, useEffect, useRef } from 'react'

export default function useScroll(
  ref: MutableRefObject<HTMLElement | null>,
  options?: {
    onScrollDown?: () => void
    onScrollUp?: () => void
  }
) {
  const prevScrollTop = useRef(0)
  const scrollHandler = (ev: ScrollEvent) => {
    console.log('ev: ', ev)
    const currentScrollTop = ev.target.scrollTop
    // TODO: too rude
    if (currentScrollTop > prevScrollTop.current) options?.onScrollDown?.()
    if (currentScrollTop < prevScrollTop.current) options?.onScrollUp?.()
    prevScrollTop.current = currentScrollTop
  }
  useEffect(() => {
    if (ref.current === null) return
    prevScrollTop.current = ref.current!.scrollTop ?? 0
    document.documentElement.addEventListener('scroll', scrollHandler as any, { passive: true })
  }, [])
}
