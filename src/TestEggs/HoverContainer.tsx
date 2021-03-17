import Div, { DivProps } from 'baseUI/Div'
import React, { ReactNode, useEffect, useRef, useState } from 'react'
export interface _HoverProps {
  children?: ReactNode
}
//IDEA: 以下滑线开头的是透明组件
//deprecated!!!!
const _Hover = ({ children }: _HoverProps) => {
  const el = useRef<HTMLDivElement>()
  useEffect(() => {
    console.log('el: ', el)
  }, [])
  return (
    <Div
      domRef={el}
      css={{ display: 'contents' }}
      onPointerMove={(el) => {
        console.log('el: ', el)
      }}
    >
      {children}
    </Div>
  )
}

export interface HoverDivProps extends DivProps {
  onHoverStateChange?: (toState: 'in' | 'out') => void
}
const HoverDiv = ({ domRef, onHoverStateChange, ...restProps }: HoverDivProps) => {
  const div = useRef<HTMLDivElement>()
  useEffect(() => {
    if (onHoverStateChange) {
      div.current!.addEventListener('pointerenter', () => {
        onHoverStateChange('in')
      })
      div.current!.addEventListener('pointerleave', () => {
        onHoverStateChange('out')
      })
      div.current!.addEventListener('pointercancel', () => {
        onHoverStateChange('out')
      })
    } //只使用Pointer系列的是有问题的
  }, [])
  return <Div domRef={[domRef, div]} {...restProps}></Div>
}

const HoverContainer = () => {
  const [isHovered, setIsHover] = useState(false)
  return (
    <HoverDiv
      css={{
        width: 100,
        height: 100,
        transition: '300ms',
        background: isHovered ? 'crimson' : 'dodgerblue' // 为什么这个可以？因为state改变直接重渲染了
      }}
      // IDEA: 可能在DIV上直接创造一个onHover事件更好
      onHoverStateChange={(state) => {
        setIsHover(state === 'in')
      }}
    >
      {isHovered ? '在内' : '在外'}
    </HoverDiv>
  )
}
export default HoverContainer
