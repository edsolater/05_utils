import React, { ReactNode, useRef } from 'react'
import Div, { divProps, DivProps } from '../Div'
import cssDefaults from '../../settings/cssDefaults'
import useUpdateEffect from '../../hooks/useUpdateEffect'
import MaskProtal from './MaskProtal'
import { CSSPropertyValue, mixCSSObjects } from 'baseUI/style'
import { mergeProps, addDefaultProps } from 'baseUI/functions'
import { useAppSettings } from '../AppSettings'
import { cache } from 'utils/functions/functionFactory'
import { pick } from 'utils/functions/object'

export interface MaskProps extends DivProps {
  /**
   * 是否显示此mask
   * @default false
   */
  isOpen?: boolean

  /**
   * 打开的瞬间（可能还是完全透明的）
   */
  onOpen?: (info: { el: HTMLDivElement }) => void
  /**
   * 打开，过渡动画结束（此时已完全可见）
   */
  onOpenTransitionEnd?: (info: { el: HTMLDivElement }) => void

  /**
   * 准备的瞬间（还没有消失完全）
   */
  onClose?: (info: { el: HTMLDivElement }) => void
  /**
   * 关闭，过渡动画结束（此时已完全不可见）
   */
  onCloseTransitionEnd?: (info: { el: HTMLDivElement }) => void

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
   * opacity of the mask's background.
   * For UI style's accordant. You should not config this option
   *
   * @default cssDefault.maskOpacity
   */
  maskOpacity?: CSSPropertyValue<'opacity'>

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
  maskOpacity: cssDefaults.maskOpacity, // TODO：如此具体的自定义不能放在CSSDefault上
  transitonDuration: cssDefaults.transiton.normal
}

const getCSS = cache((sprops: MaskSprops) =>
  mixCSSObjects({
    position: 'fixed',
    inset: '0',
    backgroundColor: sprops.maskBg,
    opacity: sprops.isOpen ? sprops.maskOpacity : '0',
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
  const maskRef = useRef<HTMLDivElement>()

  useUpdateEffect(() => {
    const openCallback = () => sprops.onOpenTransitionEnd?.({ el: maskRef.current! })
    const closeCallback = () => sprops.onCloseTransitionEnd?.({ el: maskRef.current! })

    if (sprops.isOpen === true) {
      maskRef.current!.removeEventListener('transitionend', closeCallback)
      sprops.onOpen?.({ el: maskRef.current! })
      maskRef.current!.addEventListener('transitionend', openCallback, {
        passive: true,
        once: true
      })
    }

    if (sprops.isOpen === false) {
      maskRef.current!.removeEventListener('transitionend', openCallback)
      !isCloseBySelf && sprops.onClose?.({ el: maskRef.current! })
      maskRef.current!.addEventListener('transitionend', closeCallback, {
        once: true,
        passive: true
      })
    }
  }, [sprops.isOpen])

  return (
    <MaskProtal>
      <Div
        {...mergeProps(
          {
            domRef: maskRef,
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
    </MaskProtal>
  )
}
