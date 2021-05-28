import React, { FC, useRef } from 'react'
import Div, { DivProps } from 'baseUI/Div'
import ReactDOM from 'react-dom'
import cssColor from 'baseUI/__config/cssColor'
import cssDefaults from 'baseUI/__config/cssDefaults'
import useUpdateEffect from '../../hooks/useUpdateEffect'
import createElementByString from './dom/createElementByString'

const drawerRoot = createElementByString(
  '<div class="drawer-root" style="position:fixed; inset:0; pointer-events: none"></div>'
)
document.body.append(drawerRoot)

export interface DrawerProps extends DivProps {
  /**
   * 是否显示此drawer
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
 * 打开时，会生成一个 <Drawer> 在 drawer-root
 * (可能同时存在多个Drawer)
 * @todo 这里的实现虽然干净，但可能存在一堆没有 open 的 drawer
 */
const Drawer: FC<DrawerProps> = (props) => {
  const { isOpen, onOpenStart, onOpen, onCloseStart, onClose } = props
  const drawerRef = useRef<HTMLDivElement>()

  useUpdateEffect(() => {
    const openCallback = () => onOpen?.({ el: drawerRef.current! })
    const closeCallback = () => onClose?.({ el: drawerRef.current! })

    if (isOpen === true) {
      drawerRef.current!.removeEventListener('transitionend', closeCallback)
      onOpenStart?.({ el: drawerRef.current! })
      drawerRef.current!.addEventListener('transitionend', openCallback, {
        passive: true,
        once: true
      })
    }

    if (isOpen === false) {
      drawerRef.current!.removeEventListener('transitionend', openCallback)
      onCloseStart?.({ el: drawerRef.current! })
      drawerRef.current!.addEventListener('transitionend', closeCallback, {
        once: true,
        passive: true
      })
    }
  }, [isOpen])

  // todo: 有个Drawer的占位，但还没开始写。估计会跟Mask纠缠在一起，需要多重考虑
  return ReactDOM.createPortal(
    <Div
      domRef={drawerRef}
      className='drawer'
      //但这里没预留定义初始 props 的接口
      css={{
        width: '100%',
        height: '100%',
        cursor: 'pointer',
        backgroundColor: cssColor.darkMask,
        opacity: isOpen ? '1' : '0',
        pointerEvents: isOpen ? 'initial' : 'none',
        transition: cssDefaults.transiton.normal
      }}
      onClick={onClose}
    ></Div>,
    drawerRoot
  )
}

export default Drawer
