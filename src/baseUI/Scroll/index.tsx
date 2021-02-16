/**********************
 *
 * 目的：暴露与scroll相关的API
 * 需要能做到自定义滚动条、弹性滚动
 * 逻辑与样式相分离
 *
 **********************/
import React, { useEffect, useRef } from 'react'
import Div from 'baseUI/Div'
import { mix, cssMixins } from 'style/cssMixins'
import { mergeRefs } from 'helper/reactHelper/mergeRefs'
import useRecordRef from 'hooks/useRecordedRef'
import { clone } from './clone'
import { useIScrollEventAttacher } from './useIScrollEventAttacher'
import { useHandler } from '../../hooks/useHandler'
import makeElementScroll from './makeElementScroll'
import { ScrollProps, ScrollHandles } from './i'
// TODO 有个flex，还是与业务太绑定了
const cssOutter = (cssinfo: { hideScrollbar?: boolean; scrollGrouply?: boolean } = {}) =>
  mix(cssinfo.hideScrollbar && cssMixins.noScrollbar, {
    display: 'flex',
    overflow: 'auto'
  })
/**每次滚动一组 */
const Scroll = ({
  componentRef,
  children,
  pageScroll,
  hideScrollbar = true,
  onScroll,
  onScrollStart,
  onScrollEnd,
  scrollIndex: incomeScrollIndex,
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
    onScroll: (event) => {
      onScroll?.(event)
      scrollInfo.current = clone(event)
    },
    onScrollEnd
  })
  useHandler<ScrollHandles>(componentRef, {
    scrollTo: (dx) =>
      makeElementScroll(outterRef.current!, {
        offset: typeof dx === 'number' ? dx : dx(scrollInfo.current)
      })
  })

  return (
    <Div
      className='Scroll'
      domRef={mergeRefs(outterRef, attachScroll)}
      css={cssOutter({ hideScrollbar, scrollGrouply: pageScroll })}
      _baseProps={baseProps}
    >
      {children}
    </Div>
  )
}
export default Scroll
