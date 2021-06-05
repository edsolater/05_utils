import Div from 'baseUI/components/Div'
import React, { useState } from 'react'

const HoverContainer = () => {
  const [isHovered, setIsHover] = useState(false)
  return (
    <Div
      css={{
        width: 100,
        height: 100,
        transition: '300ms',
        background: isHovered ? 'crimson' : 'dodgerblue' // 为什么这个可以？因为state改变直接重渲染了
      }}
      onHoverStart={() => setIsHover(true)}
      onHoverEnd={() => setIsHover(false)}
    >
      {isHovered ? '在内' : '在外'}
    </Div>
  )
}
export default HoverContainer
