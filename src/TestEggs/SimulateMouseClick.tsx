import Div from 'baseUI/__Div'
import Button from 'baseUI/__Button'
import React, { useRef, useState } from 'react'
const SimulateMouseClick = () => {
  const [counter, setCounter] = useState(0)
  const targetButtonRef = useRef<HTMLElement>()
  const simulateClick = (to: HTMLElement) => {
    const rect = to.getBoundingClientRect()
    const x = (rect.left + rect.right) / 2
    const y = (rect.top + rect.bottom) / 2
    to.dispatchEvent(
      new MouseEvent('click', {
        bubbles: true,
        clientX: x,
        clientY: y
      })
    )
  }
  return (
    <Div css={{ borderWidth: 1, borderColor: 'green' }}>
      被点击了{counter}次
      <Button
        domRef={targetButtonRef}
        onClick={(e) => {
          console.log('e: ', e.nativeEvent)
          setCounter((n) => n + 1)
        }}
      >
        点我增加点击次数
      </Button>
      <Button onClick={() => simulateClick(targetButtonRef.current!)}>点我模拟点击</Button>
    </Div>
  )
}
export default SimulateMouseClick

// IDEA: <Handler> 接受各种事件监听器： 比如onClick，直接给第一个子元素附上。比如onDoubleClick。比如onLongTap

// IDEA: <Absolute> 绝对定位，为了更可读，也可接收各种handler
