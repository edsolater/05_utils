import Hoverable from 'baseUI/components/wrappers/Hoverable'
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
      <Hoverable>{(hover) => (hover ? <Icon name='smile' /> : <Icon name='close' />)}</Hoverable>
    </ExampleGroup>
  </ExampleCard>
)

export default HoverableExample
