import { ScrollEvent } from 'baseUI/Scroll/_interface'
import isHTMLElement from 'helper/domElement/isHTMLElement'
import { MutableRefObject, useEffect, useRef } from 'react'

export default function useScroll(
  ref: MutableRefObject<HTMLElement | null>,
  options: {
    disable?: boolean
    onScroll?: (event: {
      targetScrollTop: number
      targetScrollHeight: number
      targetScrollLeft: number
      targetScrollWidth: number

      scrollDirection: 'down' | 'up'
    }) => void
  }
) {
  let targetElement: Element | null = null
  const prevScrollTop = useRef(0)

  const recordScroll = (ev: ScrollEvent) => {
    const currentScrollTop = ev.target.scrollTop
    if (currentScrollTop === prevScrollTop.current) return
    options.onScroll?.({
      targetScrollTop: ev.target.scrollTop,
      targetScrollLeft: ev.target.scrollLeft,
      targetScrollWidth: ev.target.scrollWidth,
      targetScrollHeight: ev.target.scrollHeight,
      scrollDirection: currentScrollTop > prevScrollTop.current ? 'down' : 'up'
    })
    prevScrollTop.current = currentScrollTop
  }

  useEffect(() => {
    if (ref.current === null) return
    if (!options.disable) {
      prevScrollTop.current = ref.current!.scrollTop ?? 0
      targetElement = findFirstScrollable(ref.current)
      if (!isHTMLElement(targetElement)) return
      targetElement.addEventListener('scroll', recordScroll as any)
    } else {
      if (!isHTMLElement(targetElement)) return
      targetElement.removeEventListener('scroll', recordScroll as any)
    }
  }, [options.disable])
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
