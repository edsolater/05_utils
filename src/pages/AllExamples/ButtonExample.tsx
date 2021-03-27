import Button from 'baseUI/Button'
import Caption from 'baseUI/Caption'
import RowBox from 'baseUI/RowBox'
import React from 'react'
import ExampleCard from './ExampleCard'
import ExampleGroup from './ExampleGroup'

/**
 * Button 的使用示例
 */
const ButtonExample = () => (
  <ExampleCard>
    <ExampleGroup>
      <Caption>填充按钮（主色）</Caption>
      <RowBox noStratch>
        <Button type='fill' size='large'>
          Large
        </Button>
        <Button type='fill'>middle</Button>
        <Button type='fill' size='small'>
          small
        </Button>
      </RowBox>
    </ExampleGroup>

    <ExampleGroup>
      <Caption>外框按钮（主色）（默认）</Caption>
      <RowBox noStratch>
        <Button size='large'>Large</Button>
        <Button>middle</Button>
        <Button size='small'>small</Button>
      </RowBox>
    </ExampleGroup>

    <ExampleGroup>
      <Caption>文字按钮</Caption>
      <RowBox noStratch>
        <Button type='text' size='large'>
          Large
        </Button>
        <Button type='text'>middle</Button>
        <Button type='text' size='small'>
          small
        </Button>
      </RowBox>
    </ExampleGroup>
  </ExampleCard>
)

export default ButtonExample
