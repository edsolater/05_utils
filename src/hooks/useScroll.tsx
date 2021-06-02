import isHTMLElement from 'helper/domElement/isHTMLElement'
import { MutableRefObject, useEffect, useRef } from 'react'

export default function useScroll(
  ref: MutableRefObject<HTMLElement | null>,
  options: {
    disable?: boolean
    initListeners?: boolean
    onScroll?: (event: { target: HTMLElement; scrollDirection: 'down' | 'up' | 'none' }) => void
  }
) {
  const scrollableElement = useRef<HTMLElement | null>(null)
  const prevScrollTop = useRef(0)

  const recordScroll = (ev: { target: HTMLElement }) => {
    const currentScrollTop = ev.target.scrollTop
    const scrollYDirection = currentScrollTop - prevScrollTop.current
    options.onScroll?.({
      target: ev.target,
      scrollDirection: scrollYDirection > 0 ? 'down' : scrollYDirection < 0 ? 'up' : 'none'
    })
    prevScrollTop.current = currentScrollTop
  }

  useEffect(() => {
    if (!options.initListeners) return
    recordScroll({ target: ref.current! })
  }, [options.initListeners])

  useEffect(() => {
    prevScrollTop.current = ref.current!.scrollTop ?? 0
    scrollableElement.current = findFirstScrollable(ref.current!)
    if (!options.disable) {
      if (!isHTMLElement(scrollableElement.current)) return
      scrollableElement.current.addEventListener('scroll', recordScroll as any)
    } else {
      if (!isHTMLElement(scrollableElement.current)) return
      scrollableElement.current.removeEventListener('scroll', recordScroll as any)
    }
  }, [options.disable])
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
