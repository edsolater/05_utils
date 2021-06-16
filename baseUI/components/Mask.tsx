import React, { ReactNode, useRef } from 'react'
import Div, { divProps, DivProps } from './Div'
import Protal from './Protal'
import { mergeProps } from 'baseUI/functions'
import { injectAppSetting } from './AppSettings'
import { pick } from 'utils/functions/object'
import Transition from './Transition'
import uiCSS from 'baseUI/settings/uiCSS'
import cssTheme from 'baseUI/settings/cssTheme'
import useCSS from 'baseUI/hooks/useCSS'

export interface MaskProps extends DivProps {
  /**
   * 是否显示此mask
   * @default false
   */
  isOpen?: boolean

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

function Mask(props: MaskProps) {
  const isCloseBySelf = useRef(false)
  const css = useCSS(props, (props) => ({
    position: 'fixed',
    inset: '0',
    backgroundColor: uiCSS.Mask.bg ?? uiCSS.Mask.bg,
    pointerEvents: props.isOpen ? 'initial' : 'none',
    transition: uiCSS.Mask.transitonDuration ?? cssTheme.transition.normal
  }))
  return (
    <Protal hidden={!props.isOpen} protalName='Mask-protal'>
      <Transition
        appear
        show={props.isOpen}
        preset='fade-in/out'
        onAfterEnter={() => props.onOpenTransitionEnd?.({})}
        onAfterLeave={() => props.onCloseTransitionEnd?.({})}
      >
        <Div
          {...mergeProps(
            {
              className: 'Mask',
              css,
              onClick(event) {
                isCloseBySelf.current = true
                props.onClose?.(event)
              }
            },
            pick(props, divProps)
          )}
        />
      </Transition>
    </Protal>
  )
}
export default injectAppSetting(Mask)
