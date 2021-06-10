import Tag from 'baseUI/components/Tag'
import useToggle from 'baseUI/hooks/useToggle'
import React from 'react'
import ExampleCard from './ExampleCard'
import ExampleGroup from './ExampleGroup'

/**
 * Button 的使用示例
 */
const TagExample = () => {
  const [isOn, { off }] = useToggle(true)
  return (
    <ExampleCard category='baseUI/componentComponent' title='Tag'>
      <ExampleGroup caption='基本'>
        <Tag open={isOn} onClose={off}>
          edsolater
        </Tag>
      </ExampleGroup>
    </ExampleCard>
  )
}

export default TagExample
