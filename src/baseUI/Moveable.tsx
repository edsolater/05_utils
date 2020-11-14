import Div from './Div'
import React, { FC, useEffect, useRef } from 'react'
import attachDragHandler from 'functions/attachDragHandler'
import setCSSVariable from '../functions/setCSSVariable'
function changeTranslateByDelta(el: HTMLElement | null, delta: { x: number; y: number }) {
  if (!el) return
  setCSSVariable(el, '--dx', original => Number(original) + delta.x)
  setCSSVariable(el, '--dy', original => Number(original) + delta.y)
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

