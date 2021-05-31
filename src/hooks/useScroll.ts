import { IRef } from 'baseUI/Div/util/mergeRefs'
import { ScrollEvent } from 'baseUI/Scroll/_interface'
import { MutableRefObject, useEffect, useRef } from 'react'

export default function useScroll(
  node: MutableRefObject<HTMLElement | null>,
  options?: {
    onScrollDown?: () => void
    onScrollUp?: () => void
  }
) {
  const prevScrollTop = useRef(0)
  const scrollHandler = (ev: ScrollEvent) => {
    const currentScrollTop = ev.target.scrollTop
    // TODO: to rude
    if (currentScrollTop > prevScrollTop.current) options?.onScrollDown?.()
    if (currentScrollTop < prevScrollTop.current) options?.onScrollUp?.()
    prevScrollTop.current = currentScrollTop
  }
  useEffect(() => {
    prevScrollTop.current = node.current?.scrollTop ?? 0
    node.current?.addEventListener('scroll', scrollHandler as any, { passive: true })
    return () => node.current?.addEventListener('scroll', scrollHandler as any)
  }, [node])
}
