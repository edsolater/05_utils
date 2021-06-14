import { Transition as Trans } from '@headlessui/react'
import React, { ReactNode } from 'react'
import { mergeProps, addDefaultProps } from 'baseUI/functions'
import { CSSPropertyValue, mixCSSObjects, parseCSS } from 'baseUI/style'
import { cache } from 'utils/functions/functionFactory'
import { pick } from 'utils/functions/object'
import { BaseUIDiv } from '.'
import { useAppSettings } from './AppSettings'
import { DivProps, divProps } from './Div'

export interface TransitionProps {
  children?: ReactNode
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
 *
 * 将子元素显示在一行，相当于flexbox
 */
const Transition = (props: TransitionProps) => {
  const appSettings = useAppSettings()
  const _sprops = mergeProps(appSettings.globalProps?.Transition, props)
  const sprops = addDefaultProps(_sprops, defaultSprops)

  return (
    <Trans
      show={sprops.show}
      className='Transition'
      enter={'dur'}
      enterFrom={'opacity-0'}
      enterTo={'opacity-100'}
      leave={'dur'}
      leaveFrom={'opacity-100'}
      leaveTo={'opacity-0'}
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
