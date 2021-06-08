import Hoverable from 'baseUI/components/Hoverable'
import Icon from 'baseUI/components/Icon'
import React from 'react'
import ExampleCard from './ExampleCard'
import ExampleGroup from './ExampleGroup'

/**
 * Icon 的使用示例
 */
const HoverableExample = () => (
  <ExampleCard category='baseUI/componentComponent' title='Hoverable'>
    <ExampleGroup caption=''>
      <Hoverable>
        <Icon name='smile' />
      </Hoverable>
    </ExampleGroup>
  </ExampleCard>
)

export default HoverableExample
