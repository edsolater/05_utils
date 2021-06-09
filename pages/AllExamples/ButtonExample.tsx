import Button from 'baseUI/components/Button'
import React from 'react'
import ExampleCard from './ExampleCard'
import ExampleGroup from './ExampleGroup'

/**
 * Button 的使用示例
 */
const ButtonExample = () => (
  <ExampleCard title='Button' category='baseUI/componentComponent'>
    <ExampleGroup caption='不同按钮类型对比'>
      <Button type='fill'>fill</Button>
      <Button type='outline'>border</Button>
      <Button type='text'>text</Button>
    </ExampleGroup>

    <ExampleGroup caption='填充按钮（主色）'>
      <Button type='fill' size='large'>
        Large
      </Button>
      <Button type='fill'>medium</Button>
      <Button type='fill' size='small'>
        small
      </Button>
    </ExampleGroup>

    <ExampleGroup caption='外框按钮（主色）'>
      <Button type='outline' size='large'>
        Large
      </Button>
      <Button type='outline'>medium</Button>
      <Button type='outline' size='small'>
        small
      </Button>
    </ExampleGroup>

    <ExampleGroup caption='文字按钮'>
      <Button type='text' size='large'>
        Large
      </Button>
      <Button type='text'>medium</Button>
      <Button type='text' size='small'>
        small
      </Button>
    </ExampleGroup>
  </ExampleCard>
)

export default ButtonExample
