import Button from 'baseUI/Button'
import Drawer from 'baseUI/Drawer'
import React, { useState } from 'react'
import ExampleCard from './ExampleCard'
import ExampleGroup from './ExampleGroup'

/**
 * Button 的使用示例
 */
const DrawerExample = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  return (
    <ExampleCard category='BaseUIComponent' title='Drawer'>
      <ExampleGroup caption='基础调用'>
        <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} needMask></Drawer>
        <Button onClick={() => setIsDrawerOpen((b) => !b)}>toggle</Button>
      </ExampleGroup>
    </ExampleCard>
  )
}

export default DrawerExample
