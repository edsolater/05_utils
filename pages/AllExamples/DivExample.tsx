import CSS from 'baseUI/components/CSS'
import Div from 'baseUI/components/Div'
import cssColor from 'baseUI/components/__config/cssColor'
import createStore from 'baseUI/components/__hooks/createStore'
import React, { useState } from 'react'
import ExampleCard from './ExampleCard'
import ExampleGroup from './ExampleGroup'

/**
 * Div 的使用示例
 */
const DivExample = () => {
  const [isFocused, setIsFocused] = useState(false)
  const GlobalStoreContext = createStore({count: 1})
  return (
    <ExampleCard category='baseUI/componentComponent' title='Div'>
      <ExampleGroup caption='onClickOutside'>
        <CSS
          width='100px'
          height='100px'
          background={isFocused ? cssColor.crimson : cssColor.dodgerblue}
        >
          <Div
            onClick={() => {
              setIsFocused(true)
            }}
            onClickOutside={() => {
              setIsFocused(false)
            }}
          />
        </CSS>
      </ExampleGroup>

      <ExampleGroup caption='onResize（使用ResizeObserver）'>
        <CSS
          width='100px'
          height='100px'
          background={cssColor.crimson}
          resize='both'
          overflow='auto'
        >
          <Div
            onResize={() => {
              // console.log(3)
            }}
          />
        </CSS>
      </ExampleGroup>
    </ExampleCard>
  )
}

export default DivExample
