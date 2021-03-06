import Input from 'baseUI/components/Input'
import React from 'react'
import cssColor from 'baseUI/style/cssColor'
import ExampleCard from './ExampleCard'
import ExampleGroup from './ExampleGroup'

/**
 * Input 的使用示例
 */
const InputExample = () => (
  <ExampleCard category='baseUI/componentComponent' title="Input">
    <ExampleGroup caption='输入框（待完善）'>
      <Input propsIcon={{ name: 'smile', color: '#333' }} >Large</Input>
      <Input propsIcon={{ name: 'smile', color: '#333' }} row="auto-increase">Large</Input>
    </ExampleGroup>
  </ExampleCard>
)

export default InputExample
