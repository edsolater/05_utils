import Button from 'baseUI/Button'
import Drawer from 'baseUI/Drawer'
import React, { useState } from 'react'
import ExampleCard from './ExampleCard'
import ExampleGroup from './ExampleGroup'

/**
 * Button 的使用示例
 */
const DrawerExample = () => {
  const [isDrawerOpen1, setIsDrawerOpen1] = useState(false)
  const [isDrawerOpen2, setIsDrawerOpen2] = useState(false)
  return (
    <ExampleCard category='BaseUIComponent' title='Drawer'>
      <ExampleGroup caption='基础调用（自定义Mask）'>
        <Drawer isOpen={isDrawerOpen1} onClose={() => setIsDrawerOpen1(false)}>
          <Drawer.Mask isOpen={isDrawerOpen1} onClose={() => setIsDrawerOpen1(false)} />
        </Drawer>
        <Button onClick={() => setIsDrawerOpen1((b) => !b)}>toggle</Button>
      </ExampleGroup>

      <ExampleGroup caption='基础调用（默认Mask）'>
        <Drawer isOpen={isDrawerOpen2} onClose={() => setIsDrawerOpen2(false)}></Drawer>
        <Button onClick={() => setIsDrawerOpen2((b) => !b)}>toggle</Button>
      </ExampleGroup>
    </ExampleCard>
  )
}

export default DrawerExample
