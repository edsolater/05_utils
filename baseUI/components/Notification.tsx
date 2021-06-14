import React from 'react'
import ReactDOM from 'react-dom'
import { mixCSSObjects } from 'baseUI/style'
import { mergeProps, addDefaultProps } from 'baseUI/functions'
import { useAppSettings } from './AppSettings'
import { cache } from 'utils/functions/functionFactory'
import createElement from 'baseUI/functions/createElement'
import _Notification from './_Notification'
import Card, { CardProps } from './Card'
import Icon, { IconProps } from './Icon'

export interface NotificationProps {
  title?: string
  detailText?: string
  _Card?: CardProps
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

export default function Notification(props: NotificationProps) {
  const appSettings = useAppSettings()
  const _sprops = mergeProps(appSettings.globalProps?.Notification, props)
  const sprops = addDefaultProps(_sprops, defaultSprops)

  return (
    <_Notification>
      <Card {...mergeProps(sprops._Card, { css: getCardCSS(sprops) })}>
        <Icon
          name='close'
          {...mergeProps(sprops._CloseIcon, { size: 'large', css: getCloseIconCSS(sprops) })}
        />
        <h3>{sprops.title ?? 'Title here'}</h3>
        <p>
          {sprops.detailText ?? 'root knowledge additional then right thought run stiff bicycle'}
        </p>
      </Card>
    </_Notification>
  )
}

/**这只是个例子 */
export function openNoti(options?: NotificationProps) {
  const ghostDiv = createElement()
  return ReactDOM.render(<Notification {...options} />, ghostDiv)
}
