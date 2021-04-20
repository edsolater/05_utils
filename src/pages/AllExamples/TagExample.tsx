import Tag from 'baseUI/Tag'
import React from 'react'
import ExampleCard from './ExampleCard'
import ExampleGroup from './ExampleGroup'

/**
 * Button 的使用示例
 */
const TagExample = () => (
  <ExampleCard title="Tag">
    <ExampleGroup caption='卡片'>
      <Tag open>edsolater</Tag>
    </ExampleGroup>
  </ExampleCard>
)

export default TagExample
