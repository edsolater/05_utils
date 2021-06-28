import { Div, CSS } from 'baseUI/components'
import Animate from 'baseUI/components/wrappers/Animate'
import Props from 'baseUI/components/wrappers/Props'
import cssColor from 'baseUI/style/cssColor'
import React, { useEffect, useState } from 'react'
import ExampleCard from './ExampleCard'
import ExampleGroup from './ExampleGroup'

/**
 * <Animate> 的使用示例
 */
const AnimateExample = () => {
  const [count, setcount] = useState(0)
  useEffect(() => {
    setInterval(() => setcount((n) => n + 1), 1000)
  }, [])
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
          {/* dfasdf */}
          <CSS exCSS={{ width: '100px', height: '100px', background: cssColor.dodgerblue }}>
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
          <Props<{ whole: number }> whole={3}>
            <CSS exCSS={{ width: '60px', height: '60px', background: cssColor.crimson }}>
              <Div />
            </CSS>
            <CSS exCSS={{ width: '60px', height: '60px', background: cssColor.crimson }}>
              <Div />
            </CSS>
          </Props>
        </Animate>
      </ExampleGroup>
    </ExampleCard>
  )
}

export default AnimateExample
