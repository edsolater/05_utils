import Button from 'baseUI/Button'
import RowBox from 'baseUI/RowBox'
import React from 'react'

/**
 * Button 的使用示例
 */
const ButtonExample = () => (
  <>
    <RowBox noStratch>
      <Button type='fill' size='large'>
        Large
      </Button>
      <Button type='fill'>middle</Button>
      <Button type='fill' size='small'>
        small
      </Button>
    </RowBox>
  </>
)

export default ButtonExample
