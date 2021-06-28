import _CSS from 'baseUI/components/wrappers/_CSS'
import Div from 'baseUI/components/Div'
import cssColor from 'baseUI/style/cssColor'
import createStore from 'baseUI/hooks/createStore'
import React, { useState } from 'react'
import ExampleCard from './ExampleCard'
import ExampleGroup from './ExampleGroup'

/**
 * Div 的使用示例
 */
const DivExample = () => {
  const [isFocused, setIsFocused] = useState(false)
  const GlobalStoreContext = createStore({ count: 1 })
  return (
    <ExampleCard category='baseUI/componentComponent' title='Div'>
      <ExampleGroup caption='onClickOutside'>
        <_CSS
          width='100px'
          height='100px'
          background={isFocused ? cssColor.crimson : cssColor.dodgerblue}
        >
          <Div
            onClick={() => {
              setIsFocused(true)
            }}
          />
        </_CSS>
      </ExampleGroup>

      <ExampleGroup caption='onResize（使用ResizeObserver）'>
        <_CSS
          width='100px'
          height='100px'
          background={cssColor.crimson}
          resize='both'
          overflow='auto'
        >
          <Div />
        </_CSS>
      </ExampleGroup>
    </ExampleCard>
  )
}

export default DivExample
