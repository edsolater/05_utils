import Div from './Div'
import React, { FC, useEffect, useRef } from 'react'
import attachDragHandler from 'functions/attachDragHandler'
import { Delta2d } from '../typings/typeConstants'
import setCSSVariable from '../functions/setCSSVariable'
function changeTranslateByDelta(el: HTMLElement | null, delta: Delta2d) {
  if (!el) return
  setCSSVariable(el, '--dx', original => Number(original) + delta.dx)
  setCSSVariable(el, '--dy', original => Number(original) + delta.dy)
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

