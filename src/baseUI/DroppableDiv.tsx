/*******************************
 * 实验 draggable tab 的
 ******************************/
import notNullish from 'functions/judgers/notNullish'
import genuuid from 'helper/uuid'
import React, { useEffect, useRef } from 'react'
import Div from './Div'

const draggingElements = new Map<string, HTMLElement>()

const TestDaggableTab = () => {
  const dropArea = useRef<HTMLDivElement>()
  useEffect(() => {
    assert(notNullish(dropArea.current))
    const el = dropArea.current
    el.addEventListener('dragenter', e => e.preventDefault())
    el.addEventListener('dragover', e => e.preventDefault())
    el.addEventListener('drop', e => {
      const draggableRandomId = e.dataTransfer?.getData('data')
      if (draggableRandomId) {
        const ele = draggingElements.get(draggableRandomId)
        if (ele) {
          draggingElements.delete(draggableRandomId)
          ;(e.target as typeof el).append(ele)
        }
      }
    })
  }, [])
  return (
    <Div css={{ display: 'grid', gridAutoFlow: 'column' }}>
      <Div css={{ width: 400, height: 400, background: 'dodgerblue' }}>
        <Div
          css={{ width: 50, height: 50, background: 'lightgray' }}
          draggable
          onDragStart={e => {
            const el = e.target as HTMLDivElement
            const randomId = genuuid()
            draggingElements.set(randomId, el)
            return e.dataTransfer.setData('data', randomId)
          }}
          onDragEnd={e => {
            console.log(3)
          }}
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
