import Input from 'baseUI/Input'
import React from 'react'
import ExampleCard from './ExampleCard'
import ExampleGroup from './ExampleGroup'

/**
 * Input 的使用示例
 */
const InputExample = () => (
  <ExampleCard>
    <ExampleGroup caption='填充按钮（主色）'>
      <Input iconProps={{ name: 'smile', color: '#1e90ff' }}>Large</Input>
    </ExampleGroup>
  </ExampleCard>
)

export default InputExample
