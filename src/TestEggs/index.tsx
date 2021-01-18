import Div from 'baseUI/Div'
import React from 'react'
import { applyMixins } from 'style/cssMixins'
import CollapseWatcher from './CollapseWatcher'
import GroupScroll from './groupScroll'
import SortableList from './SortableList'

const TestGrounds = () => (
  <Div css={applyMixins({testGridContainer:[]})}>
    <Div css={applyMixins({testGridItem:[]})}>
      <Div css={applyMixins({gridItemTextLabel:[]})}>拖拽排序</Div>
      <SortableList />
    </Div>
    <Div css={applyMixins({testGridItem:[]})}>
      <Div css={applyMixins({gridItemTextLabel:[]})}>多item碰撞检测</Div>
      <CollapseWatcher />
    </Div>
    <Div css={applyMixins({testGridItem:[]})}>
      <Div css={applyMixins({gridItemTextLabel:[]})}>整片翻页</Div>
      <GroupScroll
        items={[
          'Dollie',
          'Timothy',
          'Zachary',
          'Cory',
          'Joe',
          'Lola',
          'Katharine',
          'Mittie',
          'Mae',
          'Maria',
          'Wesley',
          'Harriet',
          'Lora',
          'Rodney',
          'Marcus',
          'Cody',
          'Ruby',
          'Nora',
          'Marvin',
          'Willie',
          'Jane',
          'Vera',
          'Georgie',
          'Brett',
          'Georgie',
          'Christopher',
          'Estelle',
          'Milton',
          'Rena',
          'Eleanor',
          'Brent',
          'Lettie',
          'Lloyd',
          'Leon',
          'Jennie',
          'Chris'
        ]}
        renderItem={(n, idx) => (
          <Div
            key={idx}
            css={{
              background: 'dodgerblue',
              color: 'white',
              display: 'grid',
              placeItems: 'center',
              fontSize: 22
            }}
          >
            {n}
          </Div>
        )}
      />
    </Div>
    <Div css={applyMixins({testGridItem:[]})}></Div>
  </Div>
)
export default TestGrounds
