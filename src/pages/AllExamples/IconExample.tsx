import Icon from 'baseUI/Icon'
import React from 'react'
import ExampleCard from './ExampleCard'
import ExampleGroup from './ExampleGroup'

/**
 * Icon 的使用示例
 */
const IconExample = () => (
  <ExampleCard title="Icon">
    <ExampleGroup caption='普通图标（默认是24px*24px的）'>
      <Icon name='smile' />
      <Icon name='smile' color='#1e90ff' hoverColor='crimson' />
    </ExampleGroup>
  </ExampleCard>
)

export default IconExample
