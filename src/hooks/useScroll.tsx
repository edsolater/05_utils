import { ScrollEvent } from 'baseUI/Scroll/_interface'
import isHTMLElement from 'helper/domElement/isHTMLElement'
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
    const currentScrollTop = ev.target.scrollTop
    if (currentScrollTop > prevScrollTop.current) options?.onScrollDown?.()
    if (currentScrollTop < prevScrollTop.current) options?.onScrollUp?.()
    prevScrollTop.current = currentScrollTop
  }
  useEffect(() => {
    if (ref.current === null) return
    prevScrollTop.current = ref.current!.scrollTop ?? 0
    let targetElement = findFirstScrollable(ref.current)
    if (isHTMLElement(targetElement)) {
      targetElement.addEventListener('scroll', scrollHandler as any, { passive: true })
    }
  }, [])
}

/**
 * find first child element which can scroll itsxelf.
 * or it will return null
 */
function findFirstScrollable(node: Element): null | Element {
  if (!isHTMLElement(node)) return null
  if (node.scrollHeight !== node.clientHeight) return node
  else {
    for (const child of node.children) {
      const result = findFirstScrollable(child)
      if (!isHTMLElement(result)) continue
      else return result
    }
    return null
  }
}
