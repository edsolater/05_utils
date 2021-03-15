import Div from 'baseUI/__Div'
import React, { ReactNode, useEffect } from 'react'
export interface _HoverProps {
  children?: ReactNode
}
//IDEA: 以下滑线开头的是透明组件
const _Hover = ({ children }: _HoverProps) => {
  useEffect(() => {
    
   },[])
  return <>{children}</>
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
      ></Div>
    </_Hover>
  )
}
export default HoverContainer
