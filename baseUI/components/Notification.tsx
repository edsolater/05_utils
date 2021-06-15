import React, { ReactNode, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { mixCSSObjects } from 'baseUI/style'
import { mergeProps, addDefaultProps } from 'baseUI/functions'
import { useAppSettings } from './AppSettings'
import { cache } from 'utils/functions/functionFactory'
import createElement from 'baseUI/functions/createElement'
import _Notification from './_Notification'
import Card, { CardProps, CardSprops } from './Card'
import Icon, { IconProps } from './Icon'
import { useToggle } from 'baseUI/hooks'

export interface NotificationProps {
  title?: string
  detailText?: string
  onClose?: () => void
  _Card?: CardSprops
  _CloseIcon?: IconProps
}

export interface NotificationSprops extends NotificationProps {}

const defaultSprops: NotificationSprops = {}

const getCardCSS = cache((sprops: NotificationSprops) =>
  mixCSSObjects({
    position: 'relative',
    width: '350px',
    minHeight: '80px',
    padding: '8px 16px'
  })
)
const getCloseIconCSS = cache((sprops: NotificationSprops) =>
  mixCSSObjects({
    position: 'absolute',
    right: '16px',
    top: '8px'
  })
)

// TODO: 失败了?，因为这么做，是组件间是离散的，没法统筹管理。还是得用stack
export default function Notification(props: NotificationProps) {
  const appSettings = useAppSettings()
  const _sprops = mergeProps(appSettings.globalProps?.Notification, props)
  const sprops = addDefaultProps(_sprops, defaultSprops)

  const [isOpen, { off }] = useToggle(true)
  useEffect(() => {
    setTimeout(off, 1000)
  }, [])

  useEffect(() => {
    if (!isOpen) {
      sprops.onClose?.()
    }
  }, [isOpen])
  return (
    <_Notification isOpen={isOpen}>
      <Card {...mergeProps(sprops._Card, { css: getCardCSS(sprops) })}>
        <Icon
          name='close'
          {...mergeProps(sprops._CloseIcon, { size: 'large', css: getCloseIconCSS(sprops) })}
          onClick={off}
        />
        <h3>{sprops.title ?? `Title here`}</h3>
        <p>
          {sprops.detailText ?? 'root knowledge additional then right thought run stiff bicycle'}
        </p>
      </Card>
    </_Notification>
  )
}

// IDEA: 这个stack要用context维护， 那么， 需要个 <NotificationStack> 组件，统筹
const stack: ReactNode[] = []
export function openNoti(options?: NotificationProps) {
  const ghostDiv = createElement()
  const thisNode = <Notification {...options} />
  stack.push(thisNode)
  return ReactDOM.render(
    <Notification
      {...options}
      onClose={() => {
        console.log(222) // it works
      }}
    />,
    ghostDiv
  )
}
