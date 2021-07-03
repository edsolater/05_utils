import { Div, CSS } from 'baseUI/components'
import Animate from 'baseUI/components/wrappers/Animate'
import Ex from 'baseUI/components/wrappers/Ex'
import cssColor from 'baseUI/style/cssColor'
import React from 'react'
import ExampleCard from './ExampleCard'
import ExampleGroup from './ExampleGroup'

/**
 * <Animate> 的使用示例
 */
const AnimateExample = () => (
  <ExampleCard category='WrapperComponent' title='<Animate>'>
    <ExampleGroup caption='basic case'>
      <Animate
        keyframes={[{ filter: 'brightness(.4)' }, { filter: 'brightness(1.6)' }]}
        options={{
          duration: 2000,
          iterations: Infinity,
          composite: 'accumulate',
          direction: 'alternate'
        }}
      >
        <Animate
          keyframes={[
            { transform: 'rotate(0) scale(0.4)' },
            { transform: 'rotate(180deg) scale(1)' },
            { transform: 'rotate(360deg) scale(0.4)' }
          ]}
          options={{ duration: 2000, iterations: Infinity, composite: 'accumulate' }}
        >
          <CSS exCSS={{ width: '100px', height: '100px', background: cssColor.dodgerblue }}>
            <Div />
            <Div />
            <Div />
            <Div />
          </CSS>
          <CSS exCSS={{ width: '100px', height: '100px', background: cssColor.dodgerblue }}>
            <Div />
          </CSS>
          <CSS exCSS={{ width: '100px', height: '100px', background: cssColor.dodgerblue }}>
            <Div />
          </CSS>
        </Animate>
      </Animate>
    </ExampleGroup>

    <ExampleGroup caption='basic case'>
      <CSS exCSS={{ width: '60px', height: '60px', background: cssColor.dodgerblue }}>
        <Animate
          keyframes={[{ transform: 'scale(0)' }, { transform: 'scale(1)' }]}
          options={{ duration: 1000, iterations: Infinity }}
        >
          <Div />
        </Animate>
      </CSS>
    </ExampleGroup>

    <ExampleGroup caption='basic case'>
      <Animate
        keyframes={[{ transform: 'scale(0)' }, { transform: 'scale(1)' }]}
        options={{ duration: 1000, iterations: Infinity }}
      >
        <Ex>
          <Ex>
            <Ex>
              <CSS exCSS={{ width: '60px', height: '60px', background: cssColor.crimson }}>
                <Div />
              </CSS>
              <CSS exCSS={{ width: '60px', height: '60px', background: cssColor.crimson }}>
                <Div />
              </CSS>
            </Ex>
          </Ex>
        </Ex>
      </Animate>
    </ExampleGroup>
  </ExampleCard>
)

export default AnimateExample
