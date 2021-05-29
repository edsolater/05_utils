import Tag from 'baseUI/Tag'
import { useBooleanController } from 'hooks/useBooleanController'
import React from 'react'
import ExampleCard from './ExampleCard'
import ExampleGroup from './ExampleGroup'

/**
 * Button 的使用示例
 */
const TagExample = () => {
  const controller = useBooleanController(true)
  return (
    <ExampleCard category='BaseUIComponent' title='Tag'>
      <ExampleGroup caption='基本'>
        <Tag open={controller.state} onClose={() => controller.turnOff()}>
          edsolater
        </Tag>
      </ExampleGroup>
    </ExampleCard>
  )
}

export default TagExample
