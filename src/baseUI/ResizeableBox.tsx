import Div from './Div'
import React, { FC } from 'react'
import { Interpolation } from '@emotion/core'
import getBoundingClientRect from 'functions/getBoundingClientRect'
import toPx from 'functions/toPx'
import pxToNumber from 'functions/pxToNumber'

// TODO: 刚成一个想法，还很残破
const ResizeableBox: FC<{}> = ({}) => {
  const mouseMoveHandler = (ev: MouseEvent) => {
    const el = ev.target as HTMLDivElement
    console.log(ev.movementX, ev.movementY)
    if (!el.style.width) {
      // TODO：要把它抽象成一个方法
      el.style.width = toPx(getBoundingClientRect(el).width)
    }
    const newWidth = toPx(pxToNumber(el.style.width) + ev.movementX)
    el.style.width = newWidth
  }
  const bindHandler = () => {
    document.addEventListener('mousemove', mouseMoveHandler)
    document.addEventListener('mouseup', clearHandler)
  }
  const clearHandler = () => {
    document.removeEventListener('mousemove', mouseMoveHandler)
    document.removeEventListener('mouseup', clearHandler)
  }
  const gridItemBasicCSS: Interpolation = {
    background: '#fff8',
    position: 'relative'
  }
  return (
    <Div
      className='grid-box'
      css={{
        maxWidth: '100vw',
        height: '80vh',
        padding: 8,
        display: 'grid',
        gridAutoFlow: 'column',
        gridTemplateColumns: '1fr 1fr',
        gap: 1,
        background: 'dodgerblue',
        overflow: 'hidden',
        resize: 'both'
      }}
    >
      <Div className='grid-item' css={[gridItemBasicCSS]}>
        <Div className='content'></Div>
        <Div
          className='resize-trigger-right'
          css={[
            { position: 'absolute', width: 10, top: 0, right: -5, bottom: 0, background: '#0001' },
            { '&:hover': {cursor:'', background: '#0003' } }
          ]}
          onMouseDown={bindHandler}
        ></Div>
        <Div className='resize-trigger-bottom'></Div>
      </Div>
      <Div className='grid-item' css={[gridItemBasicCSS]} />
    </Div>
  )
}
export default ResizeableBox
