/**********************
 *
 * 目的：暴露与scroll相关的API
 * 需要能做到自定义滚动条、弹性滚动
 * 逻辑与样式相分离
 *
 **********************/
import React, { useEffect, useRef } from 'react'
import Div from '../../../baseUI/components/Div'
import { mergeRefs } from '../../../baseUI/functions/mergeRefs'
import useRecordRef from '../../../baseUI/hooks/useRecordedRef'
import { clone } from './clone'
import { useIScrollEventAttacher } from './useIScrollEventAttacher'
import useHandler from '../../../baseUI/hooks/useHandler'
import makeElementScroll from './makeElementScroll'
import { ScrollProps, ScrollHandles } from './_interface'
import { scrollRoot } from './_css'
/**
 * @BaseUIComponent
 * 
 * 每次滚动一组 
 */
const Scroll = ({
  className,
  componentRef,
  domRef,
  hideScrollbar = true,
  onScroll,
  onScrollStart,
  onScrollEnd,
  onScrollIndexChange,
  ...restProps
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
      {...restProps}
      className={['Scroll', className]}
      domRef={mergeRefs(outterRef, attachScroll, domRef)}
      css={scrollRoot({ hideScrollbar })}
    ></Div>
  )
}
export default Scroll
function mergeFunction<F extends ((...args: any[]) => void) | undefined>(
  ...fns: F[]
): NonNullable<F> {
  // @ts-expect-error
  return (...args) => fns.forEach((fn) => fn?.(...args))
}
