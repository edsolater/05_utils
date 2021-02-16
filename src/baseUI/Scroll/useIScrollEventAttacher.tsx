import useRecordRef from 'hooks/useRecordedRef'
import { isUndefined } from 'lodash'
import timeout from '../../helper/timeout'
import { ID } from 'typings/constants'
import { ScrollEvent } from './_interface'

/**TODO: 想办法换成纯JS版与hooks版本并存 */
export function useIScrollEventAttacher(
  listeners: {
    onScroll?: (iscrollEvent: ScrollEvent) => void
    onScrollStart?: (iscrollEvent: ScrollEvent) => void
    onScrollEnd?: (iscrollEvent: ScrollEvent) => void
  } = {}
) {
  const scrollTimestamp = useRecordRef<number>()
  const scrollTop = useRecordRef(0) // 没有与incomeScrollIndex联系起来，不太好
  const scrollLeft = useRecordRef(0) // 没有与incomeScrollIndex联系起来，不太好
  const actionId = useRecordRef<ID>(0)
  const attachScroll = (el: HTMLElement | undefined | null) => {
    el?.addEventListener(
      'scroll',
      (e) => {
        scrollLeft.current = el.scrollLeft
        scrollTop.current = el.scrollTop
        scrollTimestamp.current = e.timeStamp
        const scrollEvent: ScrollEvent = {
          type: 'scroll',
          path: ((e as unknown) as { path: [] }).path,
          target: e.target as HTMLDivElement,

          clientWidth: el.clientWidth,
          clientHeight: el.clientHeight,
          scrollWidth: el.scrollWidth,
          scrollHeight: el.scrollHeight,
          scrollStartLeft: scrollLeft.prev,
          scrollStartTop: scrollLeft.prev,
          scrollLeft: scrollLeft.current,
          scrollTop: scrollLeft.current,
          scrollX: scrollLeft.current - scrollLeft.prev,
          scrollY: scrollTop.current - scrollTop.prev,

          timestamp: scrollTimestamp.current,
          prevTimestamp: scrollTimestamp.prev,
          deltaTime: scrollTimestamp.prev
            ? scrollTimestamp.current - scrollTimestamp.prev
            : undefined
        }

        const isStartScroll = isUndefined(scrollEvent.deltaTime)
        if (isStartScroll) listeners.onScrollStart?.({ ...scrollEvent, type: 'scrollstart' })

        //结束滚动
        const timeoutController = timeout(
          () => {
            const direction = 'LEFT' //TEMP
            console.log('direction: ', direction)
            listeners.onScrollEnd?.({ ...scrollEvent, type: 'scrollend' })
            scrollTimestamp.restart()
          },
          100,
          { actionId: actionId.current }
        ) //如果100毫秒没发出scroll事件，就视为scrollEnd（且手指不在屏幕上）
        actionId.current = timeoutController.actionId

        // 滚动中
        listeners.onScroll?.({ ...scrollEvent, type: 'scroll' })
      },
      { passive: true }
    )
  }
  return attachScroll
}
