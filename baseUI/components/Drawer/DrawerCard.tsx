import cssTheme from 'baseUI/settings/cssTheme'
import uiCSS from 'baseUI/settings/uiCSS'
import React, { FC, useRef } from 'react'
import useUpdateEffect from '../../hooks/useUpdateEffect'
import Div from '../Div'
import { DivProps } from "../Div"
import DrawerCardProtal from './DrawerCardProtal'

export interface DrawerCardProps extends DivProps {
  /**
   * 是否显示此drawer
   * @default false
   */
  isOpen?: boolean

  /**
   * <DrawerCard> 组件出现的方向：上下左右
   * @default 'left'
   */
  direction?: 'top' | 'right' | 'bottom' | 'left'

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
 * 打开时，会生成一个 <DrawerCard> 在 drawer-root
 * (可能同时存在多个Drawer)
 * @todo 这里的实现虽然干净，但可能存在一堆没有 open 的 drawer
 */
const DrawerCard: FC<DrawerCardProps> = (props) => {
  const { isOpen, onOpenTransitionEnd, onOpen, onCloseTransitionEnd, onClose } = props
  const drawerRef = useRef<HTMLDivElement>()

  useUpdateEffect(() => {
    const openCallback = () => onOpenTransitionEnd?.({ el: drawerRef.current! })
    const closeCallback = () => onCloseTransitionEnd?.({ el: drawerRef.current! })

    if (isOpen === true) {
      drawerRef.current!.removeEventListener('transitionend', closeCallback)
      onOpen?.({ el: drawerRef.current! })
      drawerRef.current!.addEventListener('transitionend', openCallback, {
        passive: true,
        once: true
      })
    }

    if (isOpen === false) {
      drawerRef.current!.removeEventListener('transitionend', openCallback)
      onClose?.({ el: drawerRef.current! })
      drawerRef.current!.addEventListener('transitionend', closeCallback, {
        once: true,
        passive: true
      })
    }
  }, [isOpen])

  // todo: 有个Drawer的占位，但还没开始写。估计会跟Mask纠缠在一起，需要多重考虑
  return (
    <DrawerCardProtal>
      <Div
        domRef={drawerRef}
        className='DrawerCard'
        css={{
          position: 'fixed',
          left: isOpen ? '0' : '-30%',
          width: '30%',
          height: '100%',
          backgroundColor: cssTheme.color.whiteCard,
          boxShadow: uiCSS.Drawer.shadow,
          opacity: isOpen ? '1' : '0',
          transition: cssTheme.transition.slow,
          pointerEvents: 'initial'
        }}
      >
        {props.children}
      </Div>
    </DrawerCardProtal>
  )
}

export default DrawerCard
