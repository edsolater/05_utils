import Div from 'baseUI/__Div'
import React, { StrictMode } from 'react'
import { cssMixins } from 'style/cssMixins'
import CollapseWatcher from './CollapseWatcher'
import GroupScroll from './GroupScroll'
import SimulateMouseClick from './SimulateMouseClick'
import SortableList from './SortableList'

// TODO: 做一堆小界面
// FIXME：现在这个文件还是废的
const TestGrounds = () => (
  <Div css={cssMixins.testGridContainer()}>
    <Div css={cssMixins.testGridItem()}>
      <Div css={cssMixins.gridItemTextLabel()}>拖拽排序</Div>
      <SortableList />
    </Div>
    <Div css={cssMixins.testGridItem()}>
      <Div css={cssMixins.gridItemTextLabel()}>多item碰撞检测</Div>
      <CollapseWatcher />
    </Div>
    <Div css={cssMixins.testGridItem()}>
      <Div css={cssMixins.gridItemTextLabel()}>整片翻页</Div>
      <GroupScroll
        hideScrollbar
        groupCapacity={4}
        items={
          [
            'Dolslie',
            'Timothy',
            'Zachary',
            'Cory',
            'Joe',
            'Lola',
            'Katharine',
            'Mittie',
            'Mae',
            'Maria',
            'Wesley'
          ] as const
        }
        renderItem={(item) => (
          <Div
            css={{
              background: 'dodgerblue',
              color: 'white',
              display: 'grid',
              placeItems: 'center',
              fontSize: 22,
              paddingLeft: 56,
              paddingRight: 56,
              width: 280,
              height: 80
            }}
          >
            {item}
          </Div>
        )}
      />
    </Div>
    <Div css={cssMixins.testGridItem()}>
      <Div css={cssMixins.gridItemTextLabel()}>点击模拟</Div>
      <SimulateMouseClick />
    </Div>
  </Div>
)
export default TestGrounds