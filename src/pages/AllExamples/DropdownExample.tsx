import Dropdown from 'baseUI/Dropdown'
import Icon from 'baseUI/Icon'
import React from 'react'
import ExampleCard from './ExampleCard'
import ExampleGroup from './ExampleGroup'

/**
 * Dropdown 的使用示例
 */
const DropdownExample = () => (
  <ExampleCard category='baseUI' title='Dropdown（依赖于Card）'>
    <ExampleGroup caption='基本'>
      <Dropdown toggleBy="hover" cardProps={{ height:'100px', width: '300px' }}>
        <Icon name='smile' />
      </Dropdown>
    </ExampleGroup>
  </ExampleCard>
)

export default DropdownExample
