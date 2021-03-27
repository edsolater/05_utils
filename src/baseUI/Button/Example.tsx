import Button from 'baseUI/Button'
import Caption from 'baseUI/Caption'
import RowBox from 'baseUI/RowBox'
import React from 'react'

/**
 * Button 的使用示例
 */
const ButtonExample = () => (
  <>
    <Caption>填充按钮（主）</Caption>
    <RowBox noStratch>
      <Button type='primary' size='large'>
        Large
      </Button>
      <Button type='primary'>middle</Button>
      <Button type='primary' size='small'>
        small
      </Button>
    </RowBox>
  </>
)

export default ButtonExample
