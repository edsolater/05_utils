import Div from 'baseUI/Div'
import { CSStestGridContainer, CSStestGridItem } from 'css/mixin/grid'
import { CSSgridItemTextLabel } from 'css/mixin/text'
import React from 'react'
import CollapseWatcher from './CollapseWatcher'
import GroupScroll from './groupScroll'
import SortableList from './SortableList'

const TestGrounds = () => (
  <Div css={CSStestGridContainer}>
    <Div css={CSStestGridItem}>
      <Div css={CSSgridItemTextLabel()}>拖拽排序</Div>
      <SortableList />
    </Div>
    <Div css={CSStestGridItem}>
      <Div css={CSSgridItemTextLabel()}>多item碰撞检测</Div>
      <CollapseWatcher />
    </Div>
    <Div css={CSStestGridItem}>
      <Div css={CSSgridItemTextLabel()}>整片翻页</Div>
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
    <Div css={CSStestGridItem}></Div>
  </Div>
)
export default TestGrounds
