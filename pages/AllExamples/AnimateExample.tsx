import { Div, _CSS } from 'baseUI/components'
import _Animate from 'baseUI/components/_Animate'
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
        <_Animate
          keyframes={[
            { transform: 'rotate(0) scale(0.4)' },
            { transform: 'rotate(180deg) scale(1)' },
            { transform: 'rotate(360deg) scale(0.4)' }
          ]}
          options={{ duration: 2000, iterations: Infinity }}
        >
          {/* dfasdf */}
          <_CSS width='100px' height='100px' background={cssColor.dodgerblue}>
            <Div />
            <Div />
          </_CSS>
          <_CSS width='100px' height='100px' background={cssColor.dodgerblue}>
            <Div />
          </_CSS>
          <_CSS width='100px' height='100px' background={cssColor.dodgerblue}>
            <Div />
          </_CSS>
        </_Animate>
      </ExampleGroup>

      <ExampleGroup caption='basic case'>
        <_Animate
          keyframes={[{ transform: 'scale(0)' }, { transform: 'scale(1)' }]}
          options={{ duration: 1000, iterations: Infinity }}
        >
          <_CSS width='60px' height='60px' background={cssColor.dodgerblue}>
            <Div />
          </_CSS>
        </_Animate>
      </ExampleGroup>
    </ExampleCard>
  )
}

export default AnimateExample
