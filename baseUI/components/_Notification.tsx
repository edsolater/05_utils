import React, { ReactNode } from 'react'
import ReactDOM from 'react-dom'
import { DivProps } from './Div'
import Protal from './Protal'
import { mixCSSObjects } from 'baseUI/style'
import { mergeProps, addDefaultProps } from 'baseUI/functions'
import { useAppSettings } from './AppSettings'
import { cache } from 'utils/functions/functionFactory'
import Transition from './Transition'
import createElement from 'baseUI/functions/createElement'

export interface NotificationProps extends DivProps {
  /**
   * 关闭的瞬间（还没有消失完全）
   */
  onClose?: (info: {}) => void
  /**
   * 打开，过渡动画结束（此时已完全可见）
   */
  onOpenTransitionEnd?: (info: {}) => void
  /**
   * 关闭，过渡动画结束（此时已完全不可见）
   */
  onCloseTransitionEnd?: (info: {}) => void

  children?: ReactNode
}

export interface NotificationSprops extends NotificationProps {}

const defaultSprops: NotificationSprops = {}

const getCSS = cache((sprops: NotificationSprops) => mixCSSObjects({}))

export default function _Notification(props: NotificationProps) {
  const appSettings = useAppSettings()
  const _sprops = mergeProps(appSettings.globalProps?.Caption, props)
  const sprops = addDefaultProps(_sprops, defaultSprops)

  return (
    <Protal protalName='Notification-protal'>
      <Transition
        appear
        show
        preset='fade-in/out'
        onAfterEnter={() => sprops.onOpenTransitionEnd?.({})}
        onAfterLeave={() => sprops.onCloseTransitionEnd?.({})}
      >
        {sprops.children ?? <span>_Notification 不能直接调用， 需要按照业务定义模板</span>}
      </Transition>
    </Protal>
  )
}

export function _spawnNotification() {
  const wrapperDiv = createElement({ className: 'temp' })
  return ReactDOM.render(<_Notification />, wrapperDiv)
}

export function _Notifications(props: { count?: number }) {
  return (
    <>
      {Array.from({ length: props.count ?? 0 }, (_, idx) => (
        <_Notification key={idx} />
      ))}
    </>
  )
}
