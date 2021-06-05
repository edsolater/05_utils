import Tag from 'baseUI/components/Tag'
import useBooleanController from 'baseUI/hooks/useBooleanController'
import React from 'react'
import ExampleCard from './ExampleCard'
import ExampleGroup from './ExampleGroup'

/**
 * Button 的使用示例
 */
const TagExample = () => {
  const controller = useBooleanController(true)
  return (
    <ExampleCard category='baseUI/componentComponent' title='Tag'>
      <ExampleGroup caption='基本'>
        <Tag open={controller.state} onClose={() => controller.turnOff()}>
          edsolater
        </Tag>
      </ExampleGroup>
    </ExampleCard>
  )
}

export default TagExample
