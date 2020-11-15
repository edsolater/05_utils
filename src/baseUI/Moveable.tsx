import Div from './Div'
import React, { FC, useEffect, useRef } from 'react'
import attachPointerMove from 'functions/attachPointerMove'
import { Delta2dScale, Delta2dTranslate } from '../typings/typeConstants'
import setCSSVariable from '../functions/setCSSVariable'
import attachGestureScale from 'functions/attachGestureScale'
function changeTranslateByDelta(el: HTMLElement, delta: Delta2dTranslate) {
  setCSSVariable(el, '--x', original => Number(original) + delta.dx)
  setCSSVariable(el, '--y', original => Number(original) + delta.dy)
}
function changeScaleByDelta(el: HTMLElement, scale: Delta2dScale) {
  setCSSVariable(el, '--scale', scale.scale)
}

const Moveable: FC<{}> = ({ children }) => {
  const box = useRef<HTMLDivElement>(null)
  useEffect(() => {
    attachPointerMove(box.current, (_, delta) => changeTranslateByDelta(box.current!, delta))
    attachGestureScale(box.current, (_, delta) => changeScaleByDelta(box.current!, delta))
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
        transform:
          'translate(calc(var(--x, 0) * 1px), calc(var(--y, 0) * 1px)) scale(var(--scale, 1))',
        touchAction: 'none'
      }}
    >
      {children}
    </Div>
  )
}
export default Moveable
