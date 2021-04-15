import Icon from 'baseUI/Icon'
import Caption from 'baseUI/Caption'
import RowBox from 'baseUI/RowBox'
import React from 'react'
import ExampleCard from './ExampleCard'
import ExampleGroup from './ExampleGroup'

/**
 * Icon 的使用示例
 */
const IconExample = () => (
  <ExampleCard>
    <ExampleGroup>
      <Caption>普通图标(默认是24px*24px的)</Caption>
      <RowBox noStratch>
        <Icon name='smile' />
      </RowBox>
    </ExampleGroup>

    <ExampleGroup>
      <Caption>普通图标(改颜色)</Caption>
      <RowBox noStratch>
        <Icon name='smile' color="#1e90ff" hoverColor="crimson" />
      </RowBox>
    </ExampleGroup>

  </ExampleCard>
)

export default IconExample
