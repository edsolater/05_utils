import { Animate, Div, CSS } from 'baseUI/components'
import cssColor from 'baseUI/style/cssColor'
import React from 'react'
import ExampleCard from './ExampleCard'
import ExampleGroup from './ExampleGroup'

/**
 * <Animate> 的使用示例
 */
const AnimateExample = () => {
  return (
    <ExampleCard category='WrapperComponent' title='<Animate>'>
      <ExampleGroup caption='basic case'>
        <Animate
          keyframes={[
            { transform: 'rotate(0) scale(0.4)' },
            { transform: 'rotate(180deg) scale(1)' },
            { transform: 'rotate(360deg) scale(0.4)' }
          ]}
          options={{ duration: 2000, iterations: Infinity }}
        >
          <CSS width='100px' height='100px' background={cssColor.dodgerblue}>
            <Div />
          </CSS>
        </Animate>
      </ExampleGroup>
    </ExampleCard>
  )
}

export default AnimateExample
