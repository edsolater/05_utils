/*******************************
 * 实验 draggable list 的
 ******************************/
import notNullish from 'functions/judgers/notNullish'
import React, { useEffect, useRef } from 'react'
import Div from '../baseUI/Div'

const draggingElements = new Map<string, HTMLElement>()

const TestDaggableList = () => {
  return (
    <Div css={{ display: 'grid', gap: 8 }}>
      <Div
        css={{ padding: 16, margin: 8, background: 'lightgray' }}
        draggable
        onDragEnter={preventDefault}
      >
        South Sudan
      </Div>
      <Div
        css={{ padding: 16, margin: 8, background: 'lightgray' }}
        draggable
        onDragEnter={preventDefault}
      >
        Guernsey
      </Div>
      <Div
        css={{ padding: 16, margin: 8, background: 'lightgray' }}
        draggable
        onDragEnter={preventDefault}
      >
        Benin
      </Div>
      <Div
        css={{ padding: 16, margin: 8, background: 'lightgray' }}
        draggable
        onDragEnter={preventDefault}
      >
        Russia
      </Div>
      <Div
        css={{ padding: 16, margin: 8, background: 'lightgray' }}
        draggable
        onDragEnter={preventDefault}
      >
        El Salvador
      </Div>
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
