import React, { useState } from 'react'
import Button from 'baseUI/components/Button'
import { _Notifications, _spawnNotification } from 'baseUI/components/Notification'
import ExampleCard from './ExampleCard'
import ExampleGroup from './ExampleGroup'

/**
 * Button 的使用示例
 */
const NotificationExample = () => {
  const [count, setCount] = useState(0)
  return (
    <ExampleCard category='baseUI/componentComponent' title='Notification'>
      <ExampleGroup caption='JS函数调用'>
        <Button onClick={() => _spawnNotification()}>toggle</Button>
      </ExampleGroup>
      <ExampleGroup caption='模板式调用'>
        <_Notifications count={count} />
        <Button onClick={() => setCount((n) => n + 1)}>toggle</Button>
      </ExampleGroup>
    </ExampleCard>
  )
}

export default NotificationExample
