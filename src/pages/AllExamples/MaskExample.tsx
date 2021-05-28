import Button from 'baseUI/Button'
import Mask from 'baseUI/Mask'
import ViewController from 'baseUI/ViewController'
import React, { useState } from 'react'
import ExampleCard from './ExampleCard'
import ExampleGroup from './ExampleGroup'

/**
 * Button 的使用示例
 */
const MaskExample = () => {
  const [isMaskOpen, setIsMaskOpen] = useState(false)
  return (
    <ExampleCard category='BaseUI' title='Mask'>
      <ExampleGroup caption='点击按钮打开蒙版'>
        <Mask isOpen={isMaskOpen} onClose={() => setIsMaskOpen(false)}></Mask>
        <Button onClick={() => setIsMaskOpen((b) => !b)}>toggle</Button>
      </ExampleGroup>
    </ExampleCard>
  )
}

export default MaskExample
