import Div, { DivProps } from 'baseUI/__Div'
import React, { ReactNode, useEffect, useRef } from 'react'
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
const HoverDiv = ({ onHoverStateChange, ...restProps }: HoverDivProps) => {
  if (onHoverStateChange) {
    // TODO
  }
  return <Div {...restProps}></Div>
}

const HoverContainer = () => {
  return (
    <_Hover>
      <Div
        css={{
          width: 100,
          height: 100,
          background: 'crimson'
        }}
        // IDEA: 可能在DIV上直接创造一个onHover事件更好
        // onPointerMove={(el) => {
        //   console.log('el: ', el)
        // }}
      ></Div>
    </_Hover>
  )
}
export default HoverContainer
