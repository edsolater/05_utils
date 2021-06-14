import React from 'react'
import { ComponentProps } from 'react'
import { ReactProps } from 'typings/constants'
import { DivProps } from '../Div'
import Mask from '../Mask'
import createStore from '../../hooks/createStore'
import DrawerCard from './DrawerCard'
import isChildrenContain from './isChildrenContain'
const { Provider, useStore: useDrawerContext } = createStore({ currentMaskId: null })
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


  /**
   * 点击关闭
   */
  onClose?: (info: {  }) => void
}

const _Drawer = (props: ReactProps<DrawerCardProps>) => {
  const { isOpen, onClose } = props
  const hasCustomedDrawerMask = isChildrenContain(props.children, _DrawerMask)
  return (
    <>
      {hasCustomedDrawerMask || <_DrawerMask isOpen={isOpen} onClose={onClose} />}
      <_DrawerCard isOpen={isOpen}>{props.children}</_DrawerCard>
    </>
  )
}

// IDEA: 本质上，这个用props传递控制项即可，犯不着用Context
const _DrawerMask = (props: ComponentProps<typeof Mask>) => {
  return <Mask {...props} />
}
const _DrawerCard = (props: ComponentProps<typeof DrawerCard>) => {
  return <DrawerCard {...props} />
}

/**
 * @UIComponent 抽屉组件
 * @JSComponenct 能用JS调用的组件（还没实现）
 *
 * 打开时，会生成一个 <Drawer> 在 drawer-root
 * (可能同时存在多个Drawer)
 * @todo 这里的实现虽然干净，但可能存在一堆没有 open 的 drawer
 */
const Drawer = (props) => (
  <Provider>
    <_Drawer {...props} />
  </Provider>
)

// TODO：Drawer要从_Drawer上转移挂载。 Object.assign(Drawer, _Drawer)
// TODO: 然后，就可以直接 export default wrapProvider(Drawer, Provider)了

/**
 * @UIComponent
 *
 * 打开时，会生成一个 <Drawer> 在 drawer-root
 * (可能同时存在多个Drawer)
 * @todo 这里的实现虽然干净，但可能存在一堆没有 open 的 drawer
 */
Drawer.Mask = _DrawerMask
Drawer.Card = _DrawerCard
export default Drawer
