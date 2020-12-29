/*******************************
 * 实验 draggable tab 的
 ******************************/
import Transformable from 'baseUI/Transformable'
import notNullish from 'functions/judgers/notNullish'
import React, { useEffect, useRef } from 'react'
import Div from '../baseUI/Div'

const TestDaggableTab = () => {
  const dropArea = useRef<HTMLDivElement>()
  useEffect(() => {
    assert(notNullish(dropArea.current))
    const el = dropArea.current
    el.addEventListener('dragenter', e => e.preventDefault())
    el.addEventListener('dragover', e => e.preventDefault())
    el.addEventListener('drop', e => {
      const draggableElementId = e.dataTransfer?.getData('data')
      assert(draggableElementId)
      const draggableElement = document.getElementById(draggableElementId)
      assert(draggableElement)
      ;(e.target as typeof el).append(draggableElement)
    })
  }, [])
  return (
    <Div css={{ display: 'grid', gridAutoFlow: 'column' }}>
      <Div css={{ width: 400, height: 400, background: 'dodgerblue' }}>
        <Div
          css={{ width: 50, height: 50, background: 'lightgray' }}
          id='33'
          draggable
          onDragStart={e => e.dataTransfer.setData('data', e.target.id)}
        />
      </Div>
      <Div
        ref={dropArea}
        css={{ width: 300, height: 300, background: 'crimson' }}
        onDragEnter={e => {
          e.preventDefault()
        }}
      ></Div>
      {/* <Transformable disableInertialSlide>
        <Div css={{ width: 50, height: 50, background: 'lightgray' }} />
      </Transformable> */}
    </Div>
  )
}

export default TestDaggableTab

function assert(condition: any, msg?: string): asserts condition {
  if (!condition) {
    throw new Error(msg)
  }
}
