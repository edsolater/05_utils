import Div from 'baseUI/Div'
import cssColor from 'baseUI/__config/cssColor'
import React, { useState } from 'react'
import ExampleCard from './ExampleCard'
import ExampleGroup from './ExampleGroup'

/**
 * Div 的使用示例
 */
const DivExample = () => {
  const [isFocused, setIsFocused] = useState(false)
  return (
    <ExampleCard title='Div'>
      <ExampleGroup caption='onClickOutside'>
        <Div
          onClick={() => {
            setIsFocused(true)
          }}
          onClickOutside={() => {
            setIsFocused(false)
          }}
          css={{
            width: '100px',
            height: '100px',
            background: isFocused ? cssColor.crimson : cssColor.dodgerblue
          }}
        />
      </ExampleGroup>
    </ExampleCard>
  )
}

export default DivExample
