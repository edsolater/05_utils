/*******************************
 * 实验 draggable list 的
 ******************************/
import Transformable from 'baseUI/Transformable'
import React, { FC, Ref, useRef } from 'react'
import { Direction } from 'typings/typeConstants'
import Div, { CSSProperties } from '../baseUI/Div'

const draggableItemCSS: CSSProperties = {
  padding: 16,
  margin: 8,
  background: 'lightgray'
}
// SHUT 用错了，不应该使用dragAndDrop进行拖动重排
const TestDaggableList: FC<{
  direction: Direction
}> = ({ direction = 'y' }) => {
  const itemData = ['AAAA', 'BBBB', 'CCC', 'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD']
  const itemRefs = useRef<Map<number, Ref<HTMLDivElement>>>(new Map())
  const sizeInfo = useRef<Map<number, DOMRect>>(new Map())

  return (
    <Div css={{ display: 'grid', gap: 8 }}>
      {itemData.map((text, index) => (
        <Transformable
          ref={ref => itemRefs.current.set(index, ref)}
          key={index}
          moveDirection={direction}
          onMoveStart={el => {
            const rect = el.current?.getBoundingClientRect()
            if (rect) sizeInfo.current.set(index, rect)
          }}
        >
          <Div className='temp-item' css={draggableItemCSS}>
            {text}
          </Div>
        </Transformable>
      ))}
    </Div>
  )
}

export default TestDaggableList


