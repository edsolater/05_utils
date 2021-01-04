/*******************************
 * 实验 draggable list 的
 ******************************/
import notNullish from 'functions/judgers/notNullish'
import React, { useEffect, useRef } from 'react'
import Div, { DivProps } from '../baseUI/Div'

const draggingElements = new Map<string, HTMLElement>()

// SHUT 用错了，不应该使用dragAndDrop进行拖动重排
const TestDaggableList = () => {
  const draggableItemCSS: DivProps['css'] = {
    padding: 16,
    margin: 8,
    background: 'lightgray'
  }
  const draggingItemIndex = useRef<number>()
  return (
    <Div css={{ display: 'grid', gap: 8 }}>
      {['AAAA', 'BBBB', 'CCC', 'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD'].map((text, index) => (
        <Div
          css={[
            draggableItemCSS,
            draggingItemIndex.current === index && { position: 'absolute', left: 10000 }
          ]}
          key={index}
          draggable
          onMouseDown={preventDefault}
          onDragEnter={preventDefault}
          onDragStart={e => {
            draggingItemIndex.current = index
            const cloned = (e.target as HTMLDivElement).cloneNode(true) as HTMLDivElement
            cloned.style.setProperty('position', 'absolute')
            cloned.style.setProperty('left', '10000px')
            document.body.appendChild(cloned)
            e.dataTransfer.setDragImage(cloned, 0, 0)
          }}
        >
          {text}
        </Div>
      ))}
    </Div>
  )
}

export default TestDaggableList

function assert(condition: any, msg?: string): asserts condition {
  if (!condition) {
    throw new Error(msg)
  }
}
function preventDefault(ev: UIEvent | React.UIEvent) {
  ev.preventDefault()
}
