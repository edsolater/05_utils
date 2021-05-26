import React, { FC, useEffect, useRef } from 'react'
import Div, { DivProps } from 'baseUI/Div'
import ReactDOM from 'react-dom'
import cssColor from 'baseUI/__config/cssColor'
import cssDefaults from 'baseUI/__config/cssDefaults'
import _ViewController from 'baseUI/_ViewController'

const maskRoot = document.createElement('div')
document.body.append(maskRoot)

export interface MaskProps extends DivProps {
  /**
   * 是否显示此mask
   * @default false
   */
  isOpen?: boolean
  onOpenStart?: (info: { el: HTMLDivElement }) => void
  onOpen?: (info: { el: HTMLDivElement }) => void
  onCloseStart?: (info: { el: HTMLDivElement }) => void
  onClose?: (info: { el: HTMLDivElement }) => void
}

// TODO: 考虑到多重 Mask 的情况
const Mask: FC<MaskProps> = (props) => {
  const { isOpen, onOpenStart, onOpen, onCloseStart, onClose } = props
  const maskRef = useRef<HTMLDivElement>()

  useEffect(() => { // FIXME： 为什么第一次是开了又关呢？
    console.log('isOpen: ', isOpen)
    if (isOpen) {
      onOpenStart?.({ el: maskRef.current! })
      maskRef.current!.addEventListener(
        'transitionend',
        () => {
          console.log('from inner1')
          onOpen?.({ el: maskRef.current! })
        },
        { once: true }
      )
    } else {
      onCloseStart?.({ el: maskRef.current! })
      maskRef.current!.addEventListener(
        'transitionend',
        () => {
          console.log('from inner2')
          onClose?.({ el: maskRef.current! })
        },
        { once: true }
      )
    }
  }, [isOpen])

  return ReactDOM.createPortal(
    <Div
      domRef={maskRef}
      className='mask'
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
