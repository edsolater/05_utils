import Div from 'baseUI/Div'
import React from 'react'
import { cssMixins } from 'style/cssMixins'
import CollapseWatcher from './CollapseWatcher'
import GroupScroll from './GroupScroll'
import SortableList from './SortableList'

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
        items={[
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
        ]}
        renderItem={(item) => (
          <Div
            css={{
              background: 'dodgerblue',
              color: 'white',
              display: 'grid',
              placeItems: 'center',
              fontSize: 22,
              width: 80,
              height: 80
            }}
          >
            {item}
          </Div>
        )}
      />
    </Div>
    <Div css={cssMixins.testGridItem()}></Div>
  </Div>
)
export default TestGrounds
