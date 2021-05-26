import Button from 'baseUI/Button'
import Mask from 'baseUI/Mask'
import _ViewController from 'baseUI/_ViewController'
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
      <ExampleGroup caption='卡片'>
        <Mask
          isOpen={isMaskOpen}
          onClose={() => {
            console.log('2323: ', 2323)
            setIsMaskOpen(false)
          }}
        ></Mask>
        <Button onClick={() => setIsMaskOpen((b) => !b)}>开启蒙版</Button>
      </ExampleGroup>
    </ExampleCard>
  )
}

export default MaskExample
