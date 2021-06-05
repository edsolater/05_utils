import isHTMLElement from 'utils/helper/domElement/isHTMLElement'
import { MutableRefObject, useEffect, useRef } from 'react'

interface UseScrollListenerOptions {
  disable?: boolean
  /**
   * invoke the onScroll callback initly
   */
  init?: boolean
  onScroll?: (event: { target: HTMLElement; scrollDirection: 'down' | 'up' | 'none' }) => void
}

/**
 * @hook scroll event
 * better than addEventListener('scroll', cb)
 *
 * @example
 * useScrollListener(contentRef, {
 *   disable: isScrollingByThumb,
 *   init: true,
 *   onScroll: () => {
 *     attachScrollbarThumb('height')
 *     attachScrollbarThumb('top')
 *   }
 * })
 */
export default function useScrollListener(
  ref: MutableRefObject<HTMLElement | null>,
  { disable = false, init = false, onScroll }: UseScrollListenerOptions
) {
  const scrollableElement = useRef<HTMLElement | null>(null)
  const prevScrollTop = useRef(0)

  const recordScroll = (ev: { target: HTMLElement }) => {
    const currentScrollTop = ev.target.scrollTop
    const scrollYDirection = currentScrollTop - prevScrollTop.current
    onScroll?.({
      target: ev.target,
      scrollDirection: scrollYDirection > 0 ? 'down' : scrollYDirection < 0 ? 'up' : 'none'
    })
    prevScrollTop.current = currentScrollTop
  }

  useEffect(() => {
    if (!init) return
    recordScroll({ target: ref.current! })
  }, [init])

  useEffect(() => {
    prevScrollTop.current = ref.current!.scrollTop ?? 0
    scrollableElement.current = findFirstScrollable(ref.current!)
    if (!disable) {
      if (!isHTMLElement(scrollableElement.current)) return
      scrollableElement.current.addEventListener('scroll', recordScroll as any)
    } else {
      if (!isHTMLElement(scrollableElement.current)) return
      scrollableElement.current.removeEventListener('scroll', recordScroll as any)
    }
  }, [disable])
}

/**
 * find first child element which can scroll itsxelf.
 * or it will return null
 */
function findFirstScrollable(node: HTMLElement): null | HTMLElement {
  if (!isHTMLElement(node)) return null
  if (node.scrollHeight !== node.clientHeight) return node
  else {
    for (const child of node.children) {
      const result = findFirstScrollable(child as HTMLElement)
      if (!isHTMLElement(result)) continue
      else return result
    }
    return null
  }
}
