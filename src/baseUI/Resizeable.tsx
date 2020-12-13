// 弃用， 只不过是开启了底部与右部的resize-trigger
import Div from './Div'
import React, { FC, useEffect, useRef } from 'react'
import getBoundingClientRect from 'functions/getBoundingClientRect'
import toPx from 'functions/toPx'
import attachPointerMove from 'functions/attachPointerMove'
import { changeSizeByDelta } from '../functions/manageCSS'
function attachSizeIfNeeded(el: HTMLElement | null, cssPropName: 'width' | 'height') {
  if (el && !el.style[cssPropName]) {
    el.style[cssPropName] = toPx(getBoundingClientRect(el)[cssPropName])
  }
}
const Resizeable: FC<{}> = ({ children }) => {
  const box = useRef<HTMLDivElement>(null)
  const triggerRight = useRef<HTMLDivElement>(null)
  const triggerBottom = useRef<HTMLDivElement>(null)
  const triggerBottomRight = useRef<HTMLDivElement>(null)

  // 绑定右部触发器
  useEffect(() => {
    attachPointerMove(triggerRight.current, {
      move: (_, delta) => {
        attachSizeIfNeeded(box.current, 'width')
        changeSizeByDelta(box.current, delta.dx, 'width')
      },
    })
  }, [])

  // 绑定底部触发器
  useEffect(() => {
    attachPointerMove(triggerBottom.current, {
      move: (_, delta) => {
        attachSizeIfNeeded(box.current, 'width')
        changeSizeByDelta(box.current, delta.dx, 'width')
      },
    })
  }, [])

  // 绑定右下角触发器
  useEffect(() => {
    attachPointerMove(triggerBottomRight.current, {
      move: (_, delta) => {
        attachSizeIfNeeded(box.current, 'width')
        changeSizeByDelta(box.current, delta.dx, 'width')
      },
    })
  }, [])

  return (
    <Div
      ref={box}
      className="resizable"
      css={{
        // TODO：具体的css尺寸要靠传进来的
        width: 500,
        height: 500,
        display: 'grid',
        position: 'relative',
      }}
    >
      {children}
      <Div
        ref={triggerRight}
        className="resize-trigger-right"
        css={[
          {
            position: 'absolute',
            width: 8,
            top: 0,
            right: -4,
            bottom: -4,
            cursor: 'e-resize',
            background: '#0001',
          },
          { ':hover': { background: '#0003' } },
        ]}
      ></Div>
      <Div
        ref={triggerBottom}
        className="resize-trigger-bottom"
        css={[
          {
            position: 'absolute',
            height: 8,
            left: 0,
            bottom: -4,
            right: -4,
            cursor: 'n-resize',
            background: '#0001',
          },
          { ':hover': { background: '#0003' } },
        ]}
      ></Div>
      <Div
        ref={triggerBottomRight}
        className="resize-trigger-bottom-right"
        css={[
          {
            position: 'absolute',
            height: 8,
            width: 8,
            bottom: -4,
            right: -4,
            cursor: 'nw-resize',
            background: '#0001',
          },
          { ':hover': { background: '#0003' } },
        ]}
      ></Div>
    </Div>
  )
}
export default Resizeable
