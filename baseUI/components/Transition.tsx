import { Transition as Trans } from '@headlessui/react'
import React, { ReactNode } from 'react'

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

/**
 * @BaseUIComponent
 * @see https://headlessui.dev/react/transition
 */
const Transition = (props: TransitionProps) => {
  return (
    <Trans
      appear={props.appear}
      show={props.show}
      className='Transition'
      style={{ width: 'max-content', height: 'max-content' }}
      enter='dur'
      enterFrom='opacity-0'
      enterTo='opacity-100'
      leave='dur'
      leaveFrom='opacity-100'
      leaveTo='opacity-0'
      beforeEnter={props.onBeforeEnter}
      afterEnter={props.onAfterEnter}
      beforeLeave={props.onBeforeLeave}
      afterLeave={props.onAfterLeave}
    >
      {props.children}
    </Trans>
  )
}

export default Transition
