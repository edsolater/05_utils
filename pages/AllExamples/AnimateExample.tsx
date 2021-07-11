import { Div, CSS } from 'baseUI/components'
import AttachAnimate from 'baseUI/components/wrappers/AttachAnimate'
import Ex from 'baseUI/components/wrappers/Ex'
import RefMapper from 'baseUI/components/wrappers/RefMapper'
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
      <AttachAnimate
        keyframes={[{ filter: 'brightness(.4)' }, { filter: 'brightness(1.6)' }]}
        options={{
          duration: 2000,
          iterations: Infinity,
          composite: 'accumulate',
          direction: 'alternate'
        }}
      >
        <AttachAnimate
          keyframes={[
            { transform: 'rotate(0) scale(0.4)' },
            { transform: 'rotate(180deg) scale(1)' },
            { transform: 'rotate(360deg) scale(0.4)' }
          ]}
          options={{ duration: 2000, iterations: Infinity, composite: 'accumulate' }}
        >
          <RefMapper>
            <CSS css={{ width: '100px', height: '100px', background: cssColor.dodgerblue }}>
              <RefMapper>
                <Div />
                <Div />
                <Div />
                <Div />
              </RefMapper>
            </CSS>
            <CSS css={{ width: '100px', height: '100px', background: cssColor.dodgerblue }}>
              <Div />
            </CSS>
            <CSS css={{ width: '100px', height: '100px', background: cssColor.dodgerblue }}>
              <Div />
            </CSS>
          </RefMapper>
        </AttachAnimate>
      </AttachAnimate>
    </ExampleGroup>

    <ExampleGroup caption='basic case'>
      <CSS css={{ width: '60px', height: '60px', background: cssColor.dodgerblue }}>
        <AttachAnimate
          keyframes={[{ transform: 'scale(0)' }, { transform: 'scale(1)' }]}
          options={{ duration: 1000, iterations: Infinity }}
        >
          <Div />
        </AttachAnimate>
      </CSS>
    </ExampleGroup>

    <ExampleGroup caption='basic case'>
      <AttachAnimate
        keyframes={[{ transform: 'scale(0)' }, { transform: 'scale(1)' }]}
        options={{ duration: 1000, iterations: Infinity }}
      >
        <Ex>
          <Ex>
            <Ex>
              <CSS css={{ width: '60px', height: '60px', background: cssColor.crimson }}>
                <Div />
              </CSS>
              <CSS css={{ width: '60px', height: '60px', background: cssColor.crimson }}>
                <Div />
              </CSS>
            </Ex>
          </Ex>
        </Ex>
      </AttachAnimate>
    </ExampleGroup>
  </ExampleCard>
)

export default AnimateExample
