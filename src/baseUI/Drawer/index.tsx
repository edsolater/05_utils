import React, {
  ComponentProps,
  createContext,
  FC,
  PropsWithChildren,
  ReactNode,
  useContext,
  useRef
} from 'react'
import Div, { DivProps } from 'baseUI/Div'
import ReactDOM from 'react-dom'
import cssColor from 'baseUI/__config/cssColor'
import cssDefaults from 'baseUI/__config/cssDefaults'
import useUpdateEffect from '../../hooks/useUpdateEffect'
import createElementByString from './dom/createElementByString'
import Mask from 'baseUI/Mask'
import { ReactProps } from 'typings/constants'
import DrawerCard from './DrawerCard'
const DrawContext = createContext({})
export interface DrawerCardProps extends DivProps {
  /**
   * 是否显示此drawer
   * @default false
   */
  isOpen?: boolean

  /**
   * <Drawer> 组件出现的方向：上下左右
   * @default 'left'
   */
  direction?: 'top' | 'right' | 'bottom' | 'left'

  needMask?: boolean
  // /**
  //  * 打开的瞬间（可能还是完全透明的）
  //  */
  // onOpen?: (info: { el: HTMLDivElement }) => void
  // /**
  //  * 打开，过渡动画结束（此时已完全可见）
  //  */
  // onOpenTransitionEnd?: (info: { el: HTMLDivElement }) => void

  /**
   * 点击关闭
   */
  onClose?: (info: { el: HTMLDivElement }) => void
  // /**
  //  * 关闭，过渡动画结束（此时已完全不可见）
  //  */
  // onCloseTransitionEnd?: (info: { el: HTMLDivElement }) => void
}

/**
 * 打开时，会生成一个 <Drawer> 在 drawer-root
 * (可能同时存在多个Drawer)
 * @todo 这里的实现虽然干净，但可能存在一堆没有 open 的 drawer
 */
const Drawer = (props: ReactProps<DrawerCardProps>) => {
  // todo: 有个Drawer的占位，但还没开始写。估计会跟Mask纠缠在一起，需要多重考虑
  const { isOpen, needMask, onClose } = props
  return (
    <DrawContext.Provider value={{ isClosedByMask: 2 } /* TODO */}>
      {/* FIXME: 应该有个<_MaskProtal>组件，不然，一个APP中只能存在一个Mask了 */}
      {needMask && <Drawer.Mask isOpen={isOpen} onClose={onClose} />}
      <Drawer.Card isOpen={isOpen}>{props.children}</Drawer.Card>
    </DrawContext.Provider>
  )
}

Drawer.Mask = (props: ComponentProps<typeof Mask>) => {
  const hasDefaultMask = false
  const drawerContectInfo = useContext(DrawContext)

  return <Mask {...props} />
}

Drawer.Card = (props: ComponentProps<typeof DrawerCard>) => {
  return <DrawerCard {...props} />
}
export default Drawer
