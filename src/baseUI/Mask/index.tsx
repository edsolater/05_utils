import React, { FC, useRef } from 'react'
import Div, { DivProps } from 'baseUI/Div'
import ReactDOM from 'react-dom'
import cssColor from 'baseUI/__config/cssColor'
import cssDefaults from 'baseUI/__config/cssDefaults'
import useUpdateEffect from '../../hooks/useUpdateEffect'
import createElementByString from './dom/createElementByString'

const maskTrack = createElementByString(
  '<div class="mask-root" style="position:fixed; inset:0; pointer-events: none"></div>'
)
document.body.append(maskTrack)

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
}

/**
 * 打开时，会生成一个 <Mask> 在 mask-root
 * (可能同时存在多个Mask)
 * @todo 这里的实现虽然干净，但可能存在一堆没有 open 的 mask
 */
const Mask: FC<MaskProps> = (props) => {
  const { isOpen, onOpenTransitionEnd, onOpen, onCloseTransitionEnd, onClose } = props
  const isCloseBySelf = useRef(false)
  const maskRef = useRef<HTMLDivElement>()

  useUpdateEffect(() => {
    const openCallback = () => onOpenTransitionEnd?.({ el: maskRef.current! })
    const closeCallback = () => onCloseTransitionEnd?.({ el: maskRef.current! })

    if (isOpen === true) {
      maskRef.current!.removeEventListener('transitionend', closeCallback)
      onOpen?.({ el: maskRef.current! })
      maskRef.current!.addEventListener('transitionend', openCallback, {
        passive: true,
        once: true
      })
    }

    if (isOpen === false) {
      maskRef.current!.removeEventListener('transitionend', openCallback)
      !isCloseBySelf && onClose?.({ el: maskRef.current! })
      maskRef.current!.addEventListener('transitionend', closeCallback, {
        once: true,
        passive: true
      })
    }
  }, [isOpen])

  return ReactDOM.createPortal(
    <Div
      domRef={maskRef}
      className='mask'
      //但这里没预留定义初始props的接口
      css={{
        width: '100%',
        height: '100%',
        backgroundColor: cssColor.darkMask,
        opacity: isOpen ? '1' : '0',
        pointerEvents: isOpen ? 'initial' : 'none',
        transition: cssDefaults.transiton.normal
      }}
      onClick={(event) => {
        isCloseBySelf.current = true
        onClose?.(event)
      }}
    ></Div>,
    maskTrack
  )
}

export default Mask
