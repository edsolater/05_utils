import { Interpolation } from '@emotion/core'
import Div from 'baseUI/Div'
import React from 'react'
import CollapseWatcher from './CollapseWatcher'
import SortableList from './SortableList'

const testGridContainerCSS: Interpolation = {
  display: 'grid',
  gridTemplate: '1fr 1fr / 1fr 1fr',
  gap: 8,
  overflow:'hidden',
  background: 'lightgray',
  height: '100vh'
}
const testGridItemCSS: Interpolation = { background: 'white', position: 'relative',overflow:'hidden' }
const testLabelCSS: Interpolation = {
  position: 'absolute',
  left: '50%',
  top: 0,
  transform: 'translateX(-50%)',
  fontSize: 34,
  color: 'gray'
}
const TestGrounds = () => (
  <Div css={testGridContainerCSS}>
    <Div css={testGridItemCSS}>
      <Div css={testLabelCSS}>拖拽排序</Div>
      <SortableList />
    </Div>
    <Div css={testGridItemCSS}>
      <Div css={testLabelCSS}>多item碰撞检测</Div>
      <CollapseWatcher />
    </Div>
    <Div css={testGridItemCSS}>
      <CollapseWatcher />
    </Div>
    <Div css={testGridItemCSS}>
    </Div>
  </Div>
)
export default TestGrounds
