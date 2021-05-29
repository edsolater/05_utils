import React, { useState } from 'react'
import Button from 'baseUI/Button'
import Mask from 'baseUI/Mask'
import ExampleCard from './ExampleCard'
import ExampleGroup from './ExampleGroup'

/**
 * Button 的使用示例
 */
const MaskExample = () => {
  const [isMaskOpen, setIsMaskOpen] = useState(false)
  return (
    <ExampleCard category='BaseUIComponent' title='Mask'>
      <ExampleGroup caption='简单调用'>
        <Mask isOpen={isMaskOpen} onClose={() => setIsMaskOpen(false)}></Mask>
        <Button onClick={() => setIsMaskOpen((b) => !b)}>toggle</Button>
      </ExampleGroup>
    </ExampleCard>
  )
}

export default MaskExample
