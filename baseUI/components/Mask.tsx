import React, { ReactNode, useRef } from 'react'
import Div, { divProps, DivProps } from './Div'
import cssDefaults from '../settings/cssDefaults'
import Protal from './Protal'
import { CSSPropertyValue, mixCSSObjects } from 'baseUI/style'
import { mergeProps, addDefaultProps } from 'baseUI/functions'
import { useAppSettings } from './AppSettings'
import { cache } from 'utils/functions/functionFactory'
import { pick } from 'utils/functions/object'
import Transition from './Transition'

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

export interface MaskSprops extends MaskProps {
  /**
   * @cssProps
   * mask's background.
   * It should be non-transparent color/gradiant
   *
   * @default cssDefault.maskBg
   */
  maskBg?: CSSPropertyValue<'background'>

  /**
   * @cssProps
   * the transition time of animation when open/close the mask
   *
   * @default cssDefaults.transiton.normal
   */
  transitonDuration?: CSSPropertyValue<'transitionDuration'>
}

const defaultSprops: MaskSprops = {
  maskBg: cssDefaults.maskBg, // TODO：如此具体的自定义不能放在CSSDefault上
  transitonDuration: cssDefaults.transiton.normal
}

const getCSS = cache((sprops: MaskSprops) =>
  mixCSSObjects({
    position: 'fixed',
    inset: '0',
    backgroundColor: sprops.maskBg,
    pointerEvents: sprops.isOpen ? 'initial' : 'none',
    transition: sprops.transitonDuration
  })
)

/**
 * 打开时，会生成一个 <Mask> 在 mask-root
 * (可能同时存在多个Mask)
 * @todo 这里的实现虽然干净，但可能存在一堆没有 open 的 mask
 */
export default function Mask(props: MaskProps) {
  const appSettings = useAppSettings()
  const _sprops = mergeProps(appSettings.globalProps?.Caption, props)
  const sprops = addDefaultProps(_sprops, defaultSprops)

  const isCloseBySelf = useRef(false)

  return (
    <Protal hidden={!sprops.isOpen} protalName="Mask-protal">
      <Transition
        show={sprops.isOpen}
        preset='fade-in/out'
        onAfterEnter={() => sprops.onOpenTransitionEnd?.({})}
        onAfterLeave={() => sprops.onCloseTransitionEnd?.({})}
      >
        <Div
          {...mergeProps(
            {
              className: 'Mask',
              css: getCSS(sprops),
              onClick(event) {
                isCloseBySelf.current = true
                sprops.onClose?.(event)
              }
            },
            pick(sprops, divProps)
          )}
        />
      </Transition>
    </Protal>
  )
}
