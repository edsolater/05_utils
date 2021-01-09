/*******************************
 * 实验 draggable list 的
 ******************************/
import Transformable from 'baseUI/Transformable'
import React, { FC, Ref, useEffect, useRef } from 'react'
import { Direction } from 'typings/typeConstants'
import Div, { CSSObject } from '../baseUI/Div'

const draggableItemCSS: CSSObject = {
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
  useEffect(() => {}, [])

  return (
    <Div css={{ position: 'absolute', display: 'grid', gap: 8 }}>
      {itemData.map((text, index) => (
        <Transformable
          ref={ref => {
            itemRefs.current.set(index, ref)
            sizeInfo.current.set(index, ref)
          }}
          key={index}
          moveDirection={direction}
          onMoveStart={el => {
            const blankSpanceDiv = <Div></Div>
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
