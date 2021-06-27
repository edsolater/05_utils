import Dropdown from 'baseUI/components/Dropdown'
import Icon from 'baseUI/components/Icon'
import React from 'react'
import ExampleCard from './ExampleCard'
import ExampleGroup from './ExampleGroup'

/**
 * Dropdown 的使用示例
 */
const DropdownExample = () => (
  <ExampleCard category='baseUI/componentComponent' title='Dropdown（依赖于Card）'>
    <ExampleGroup caption='基本'>
      <Dropdown toggleBy="hover" propsCard={{ height:'100px', width: '300px' }}>
        <Icon name='smile' />
      </Dropdown>
    </ExampleGroup>
  </ExampleCard>
)

export default DropdownExample
