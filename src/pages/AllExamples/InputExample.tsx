import Input from 'baseUI/Input'
import React from 'react'
import cssColor from 'baseUI/__config/cssColor'
import ExampleCard from './ExampleCard'
import ExampleGroup from './ExampleGroup'

/**
 * Input 的使用示例
 */
const InputExample = () => (
  <ExampleCard category='baseUI' title="Input">
    <ExampleGroup caption='输入框（待完善）'>
      <Input iconProps={{ name: 'smile', color: '#333' }} inputFocusColor={cssColor.dodgerblue}>Large</Input>
      <Input iconProps={{ name: 'smile', color: '#333' }} row="auto-increase">Large</Input>
    </ExampleGroup>
  </ExampleCard>
)

export default InputExample
