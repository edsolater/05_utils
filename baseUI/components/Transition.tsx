import { Transition as Trans } from '@headlessui/react'
import React, { ReactNode } from 'react'
import { mergeProps, addDefaultProps } from 'baseUI/functions'
import { cache } from 'utils/functions/functionFactory'
import { useAppSettings } from './AppSettings'

export interface TransitionProps {
  children?: ReactNode
  appear?: boolean
  show?: boolean
  preset?: 'fade-in/out'
  onBeforeEnter?: () => void
  onAfterEnter?: () => void
  onBeforeLeave?: () => void
  onAfterLeave?: () => void
}

export interface TransitionSprops extends TransitionProps {}

const defaultSprops: TransitionSprops = {}

const getCSS = cache((sprops: TransitionSprops) => {})
/**
 * @BaseUIComponent
 * @see https://headlessui.dev/react/transition
 */
const Transition = (props: TransitionProps) => {
  const appSettings = useAppSettings()
  const _sprops = mergeProps(appSettings.globalProps?.Transition, props)
  const sprops = addDefaultProps(_sprops, defaultSprops)

  return (
    <Trans
      appear={sprops.appear}
      show={sprops.show}
      className='Transition'
      style={{ width: 'max-content', height: 'max-content' }}
      enter='dur'
      enterFrom='opacity-0'
      enterTo='opacity-100'
      leave='dur'
      leaveFrom='opacity-100'
      leaveTo='opacity-0'
      beforeEnter={sprops.onBeforeEnter}
      afterEnter={sprops.onAfterEnter}
      beforeLeave={sprops.onBeforeLeave}
      afterLeave={sprops.onAfterLeave}
    >
      {sprops.children}
    </Trans>
  )
}

export default Transition
