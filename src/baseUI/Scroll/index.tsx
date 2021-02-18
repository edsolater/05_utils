/**********************
 *
 * 目的：暴露与scroll相关的API
 * 需要能做到自定义滚动条、弹性滚动
 * 逻辑与样式相分离
 *
 **********************/
import React, { useEffect, useRef } from 'react'
import Div from 'baseUI/__Div'
import { mergeRefs } from 'helper/reactHelper/mergeRefs'
import useRecordRef from 'hooks/useRecordedRef'
import { clone } from './clone'
import { useIScrollEventAttacher } from './useIScrollEventAttacher'
import { useHandler } from '../../hooks/useHandler'
import makeElementScroll from './makeElementScroll'
import { ScrollProps, ScrollHandles } from './_interface'
import { scrollRoot } from './_css'
/**每次滚动一组 */
const Scroll = ({
  componentRef,
  children,
  hideScrollbar = true,
  onScroll,
  onScrollStart,
  onScrollEnd,
  onScrollIndexChange,
  ...baseProps
}: ScrollProps) => {
  const outterRef = useRef<HTMLDivElement>()
  const scrollInfo = useRecordRef({
    clientWidth: 0,
    scrollWidth: 0,
    scrollLeft: 0
  })
  useEffect(() => {
    scrollInfo.current = {
      clientWidth: outterRef.current!.clientWidth,
      scrollWidth: outterRef.current!.scrollWidth,
      scrollLeft: outterRef.current!.scrollLeft
    }
  }, [])
  const attachScroll = useIScrollEventAttacher({
    onScrollStart,
    onScroll: mergeFunction(onScroll, (event) => (scrollInfo.current = clone(event))),
    onScrollEnd
  })
  useHandler<ScrollHandles>(componentRef, {
    scroll: (dx, mode) =>
      makeElementScroll(outterRef.current!, {
        offset: typeof dx === 'number' ? dx : dx(scrollInfo.current),
        mode
      })
  })
  return (
    <Div
      className='Scroll'
      domRef={mergeRefs(outterRef, attachScroll)}
      css={scrollRoot({ hideScrollbar })}
      _baseProps={baseProps}
    >
      {children}
    </Div>
  )
}
export default Scroll
function mergeFunction<F extends ((...args: any[]) => void) | undefined>(
  ...fns: F[]
): NonNullable<F> {
  // @ts-expect-error
  return (...args) => fns.forEach((fn) => fn?.(...args))
}
