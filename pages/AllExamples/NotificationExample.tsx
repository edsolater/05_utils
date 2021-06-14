import React, { useState } from 'react'
import Button from 'baseUI/components/Button'
import { _Notifications } from 'baseUI/components/_Notification'
import ExampleCard from './ExampleCard'
import ExampleGroup from './ExampleGroup'
import { openNoti } from 'baseUI/components/Notification'

/**
 * Button 的使用示例
 */
const NotificationExample = () => {
  const [count, setCount] = useState(0)
  return (
    <ExampleCard category='baseUI/componentComponent' title='Notification'>
      <ExampleGroup caption='JS函数调用'>
        <Button onClick={() => openNoti()}>toggle</Button>
      </ExampleGroup>
      <ExampleGroup caption='模板式调用'>
        <_Notifications count={count} />
        <Button onClick={() => setCount((n) => n + 1)}>toggle</Button>
      </ExampleGroup>
    </ExampleCard>
  )
}

export default NotificationExample
