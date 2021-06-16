import React from 'react'
import Div from 'baseUI/components/Div'
import cssMixins from "baseUI/style/cssMixins"
import CollapseWatcher from './Transform'
import GroupScroll from './GroupScroll'
import HoverContainer from './HoverContainer'
import SimulateMouseClick from './SimulateMouseClick'
import SortableList from './SortableList'
import TrafficLight from './TrafficLight'

const TestGrounds = () => (
  <Div css={cssMixins.testGridContainer()}>
    <Div css={cssMixins.testGridItem()}>
      <Div css={cssMixins.gridItemTextLabel()}>拖拽排序</Div>
      <SortableList />
    </Div>
    <Div css={cssMixins.testGridItem()}>
      <Div css={cssMixins.gridItemTextLabel()}>触摸移动、缩放</Div>
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
    <Div css={cssMixins.testGridItem()}>
      <Div css={cssMixins.gridItemTextLabel()}>红绿灯</Div>
      <TrafficLight />
    </Div>
    <Div css={cssMixins.testGridItem()}>
      <Div css={cssMixins.gridItemTextLabel()}>透明组件：hover容器</Div>
      <HoverContainer />
    </Div>
  </Div>
)
export default TestGrounds
