import React, { FC, useRef } from 'react'
import Div, { DivProps } from 'baseUI/Div'
import ReactDOM from 'react-dom'
import cssColor from 'baseUI/__config/cssColor'
import cssDefaults from 'baseUI/__config/cssDefaults'
import _ViewController from 'baseUI/_ViewController'
import useUpdateEffect from '../../hooks/useUpdateEffect'

export function createElementByString(innerHTMLStr): HTMLElement {
  const tempNode = document.createElement('div')
  tempNode.innerHTML = innerHTMLStr
  if (tempNode.firstElementChild === null)
    throw "can't create an element by input, maybe you type wrong string"
  return tempNode.firstElementChild as any
}

const maskRoot = createElementByString('<div class="mask-root"></div>')
document.body.append(maskRoot)

export interface MaskProps extends DivProps {
  /**
   * 是否显示此mask
   * @default false
   */
  isOpen?: boolean

  /**
   * 点击打开时
   */
  onOpenStart?: (info: { el: HTMLDivElement }) => void

  /**
   * 打开的过渡动画结束后
   */
  onOpen?: (info: { el: HTMLDivElement }) => void

  /**
   * 关闭动画开始时
   */
  onCloseStart?: (info: { el: HTMLDivElement }) => void

  /**
   * 关闭动画完毕后
   */
  onClose?: (info: { el: HTMLDivElement }) => void
}

/**
 * 打开时，会生成一个 <Mask> 在 mask-root
 * (可能同时存在多个Mask)
 * @todo 这里的实现虽然干净，但可能存在一堆没有 open 的 mask
 */
const Mask: FC<MaskProps> = (props) => {
  const { isOpen, onOpenStart, onOpen, onCloseStart, onClose } = props
  const maskRef = useRef<HTMLDivElement>()

  useUpdateEffect(() => {
    const openCallback = () => onOpen?.({ el: maskRef.current! })
    const closeCallback = () => onClose?.({ el: maskRef.current! })

    if (isOpen === true) {
      maskRef.current!.removeEventListener('transitionend', closeCallback)
      onOpenStart?.({ el: maskRef.current! })
      maskRef.current!.addEventListener('transitionend', openCallback, {
        passive: true,
        once: true
      })
    }

    if (isOpen === false) {
      maskRef.current!.removeEventListener('transitionend', openCallback)
      onCloseStart?.({ el: maskRef.current! })
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
        position: 'fixed',
        inset: '0',
        backgroundColor: cssColor.darkMask,
        opacity: isOpen ? '1' : '0',
        pointerEvents: isOpen ? 'initial' : 'none',
        transition: cssDefaults.transiton.normal
      }}
      onClick={onClose}
    ></Div>,
    maskRoot
  )
}

export default Mask
