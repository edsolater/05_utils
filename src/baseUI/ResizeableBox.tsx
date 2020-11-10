import Div from './Div'
import React, { FC, useEffect, useRef } from 'react'
import getBoundingClientRect from 'functions/getBoundingClientRect'
import toPx from 'functions/toPx'
import pxToNumber from 'functions/pxToNumber'
function attachInlineLayoutCssIfNeeded(el: HTMLElement | null, cssPropName: 'width' | 'height') {
  if (el && !el.style[cssPropName]) {
    el.style[cssPropName] = toPx(getBoundingClientRect(el)[cssPropName])
  }
}
function changeLayoutByDelta(
  el: HTMLElement | null,
  deltaPx: number,
  cssPropName: 'width' | 'height'
) {
  if (!el) return
  const newPx = toPx(pxToNumber(el.style[cssPropName]) + deltaPx)
  el.style[cssPropName] = newPx
}

//交替触发2个trigger有bug，右下角还需要个双向resizer
const ResizeableBox: FC<{}> = ({ children }) => {
  const box = useRef<HTMLDivElement>(null)
  const triggerRight = useRef<HTMLDivElement>(null)
  const triggerBottom = useRef<HTMLDivElement>(null)
  const triggerBottomRight = useRef<HTMLDivElement>(null)

  // 绑定右部触发器
  useEffect(() => {
    const mouseMoveHandler = (ev: MouseEvent) => {
      ev.preventDefault()
      attachInlineLayoutCssIfNeeded(box.current, 'width')
      changeLayoutByDelta(box.current, ev.movementX, 'width')
    }
    triggerRight.current?.addEventListener('mousedown', ev => {
      ev.preventDefault()
      document.addEventListener('mousemove', mouseMoveHandler)
      document.addEventListener(
        'mouseup',
        () => document.removeEventListener('mousemove', mouseMoveHandler),
        { once: true }
      )
    })
  }, [])

  // 绑定底部触发器
  useEffect(() => {
    const mouseMoveHandler = (ev: MouseEvent) => {
      ev.preventDefault()
      attachInlineLayoutCssIfNeeded(box.current, 'height')
      changeLayoutByDelta(box.current, ev.movementY, 'height')
    }
    triggerBottom.current?.addEventListener('mousedown', ev => {
      ev.preventDefault()
      document.addEventListener('mousemove', mouseMoveHandler)
      document.addEventListener(
        'mouseup',
        () => document.removeEventListener('mousemove', mouseMoveHandler),
        { once: true }
      )
    })
  }, [])

  // 绑定右下角触发器
  useEffect(() => {
    const mouseMoveHandler = (ev: MouseEvent) => {
      ev.preventDefault()
      attachInlineLayoutCssIfNeeded(box.current, 'width')
      attachInlineLayoutCssIfNeeded(box.current, 'height')
      changeLayoutByDelta(box.current, ev.movementX, 'width')
      changeLayoutByDelta(box.current, ev.movementY, 'height')
    }
    //TODO 抽象成 whenDrag 方法
    triggerBottomRight.current?.addEventListener('mousedown', ev => {
      ev.preventDefault()
      document.addEventListener('mousemove', mouseMoveHandler)
      document.addEventListener(
        'mouseup',
        () => document.removeEventListener('mousemove', mouseMoveHandler),
        { once: true }
      )
    })
  }, [])

  return (
    <Div
      ref={box}
      className='resizable'
      css={{
        width: 500,
        height: 500,
        display: 'grid',
        backgroundColor: 'dodgerblue',
        position: 'relative'
      }}
    >
      {children}
      <Div
        ref={triggerRight}
        className='resize-trigger-right'
        css={[
          {
            position: 'absolute',
            width: 8,
            top: 0,
            right: -4,
            bottom: -4,
            cursor: 'e-resize',
            background: '#0001'
          },
          { ':hover': { background: '#0003' } }
        ]}
      ></Div>
      <Div
        ref={triggerBottom}
        className='resize-trigger-bottom'
        css={[
          {
            position: 'absolute',
            height: 8,
            left: 0,
            bottom: -4,
            right: -4,
            cursor: 'n-resize',
            background: '#0001'
          },
          { ':hover': { background: '#0003' } }
        ]}
      ></Div>
      <Div
        ref={triggerBottomRight}
        className='resize-trigger-bottom-right'
        css={[
          {
            position: 'absolute',
            height: 8,
            width: 8,
            bottom: -4,
            right: -4,
            cursor: 'nw-resize',
            background: '#0001'
          },
          { ':hover': { background: '#0003' } }
        ]}
      ></Div>
    </Div>
  )
}
export default ResizeableBox
