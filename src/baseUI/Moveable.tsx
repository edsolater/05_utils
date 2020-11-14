import Div from './Div'
import React, { FC, useEffect, useRef } from 'react'
import attachDragHandler from 'functions/attachDragHandler'
import { Delta2d } from '../typings/constants'
function changeTranslateByDelta(el: HTMLElement | null, delta: Delta2d) {
  if (!el) return
  const newDeltaX = (Number(el.style.getPropertyValue('--dx')) ?? 0) + delta.dx
  const newDeltaY = (Number(el.style.getPropertyValue('--dy')) ?? 0) + delta.dy
  el.style.setProperty('--dx', `${newDeltaX}`)
  el.style.setProperty('--dy', `${newDeltaY}`)
}

const Moveable: FC<{}> = ({ children }) => {
  const box = useRef<HTMLDivElement>(null)

  useEffect(() => {
    attachDragHandler(box.current, (_, delta) => {
      changeTranslateByDelta(box.current, delta)
    })
  }, [])

  return (
    <Div
      ref={box}
      className='movable'
      css={{
        // TODO：具体的css尺寸要靠传进来的
        width: 100,
        height: 100,
        display: 'grid',
        position: 'relative',
        transform: 'translate(calc(var(--dx, 0) * 1px), calc(var(--dy, 0) * 1px))'
      }}
    >
      {children}
    </Div>
  )
}
export default Moveable
