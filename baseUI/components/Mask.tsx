import React, { ReactNode, useRef } from 'react'
import Div from './Div'
import { DivProps } from "./baseProps"
import Protal from './Protal'
import { mergeProps } from 'baseUI/functions'
import { injectAppSetting } from './AppSettings'
import Transition from './Transition'
import uiCSS from 'baseUI/settings/uiCSS'
import cssTheme from 'baseUI/settings/cssTheme'
import { toICSS } from 'baseUI/style/cssParser'

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

const getCSS = toICSS(({ isOpen }: MaskProps) => ({
  position: 'fixed',
  inset: '0',
  backgroundColor: uiCSS.Mask.bg ?? uiCSS.Mask.bg,
  pointerEvents: isOpen ? 'initial' : 'none',
  transition: uiCSS.Mask.transitonDuration ?? cssTheme.transition.normal
}))

function Mask({
  isOpen,
  onOpenTransitionEnd,
  onCloseTransitionEnd,
  onClose,
  ...restProps
}: MaskProps) {
  const isCloseBySelf = useRef(false)
  const css = getCSS({ isOpen })
  return (
    <Protal hidden={!isOpen} protalName='Mask-protal'>
      <Transition
        appear
        show={isOpen}
        preset='fade-in/out'
        onAfterEnter={() => onOpenTransitionEnd?.({})}
        onAfterLeave={() => onCloseTransitionEnd?.({})}
      >
        <Div
          {...mergeProps(
            {
              className: 'Mask',
              css,
              onClick(event) {
                isCloseBySelf.current = true
                onClose?.(event)
              }
            },
            restProps
          )}
        />
      </Transition>
    </Protal>
  )
}
export default injectAppSetting(Mask)
