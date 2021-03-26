import RowBox from 'baseUI/RowBox'
import React from 'react'
import Button from '../Button'

/**
 * 普通Button，TODO
 */
const ButtonExample = () => (
  <>
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
