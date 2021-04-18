import Input from 'baseUI/Input'
import Caption from 'baseUI/Caption'
import RowBox from 'baseUI/RowBox'
import React from 'react'
import ExampleCard from './ExampleCard'
import ExampleGroup from './ExampleGroup'

/**
 * Input 的使用示例
 */
const InputExample = () => (
  <ExampleCard>
    <ExampleGroup>
      <Caption>填充按钮（主色）</Caption>
      <RowBox noStratch>
        <Input iconProps={{ name: 'smile', color: '#1e90ff' }}>Large</Input>
      </RowBox>
    </ExampleGroup>
  </ExampleCard>
)

export default InputExample
