import Hoverable from 'baseUI/components/wrappers/Hoverable'
import Icon from 'baseUI/components/Icon'
import React from 'react'
import ExampleCard from './ExampleCard'
import ExampleGroup from './ExampleGroup'
import { VerboseProps } from 'baseUI/components/wrappers/Ex'

/**
 * Icon 的使用示例
 */

function CurrentIcon({ isHovered = false, domRef }: Partial<VerboseProps>) {
  return <Icon domRef={domRef} name={isHovered ? 'smile' : 'close'} />
}

const HoverableExample = () => (
  <ExampleCard category='WrapperComponent' title='Hoverable'>
    <ExampleGroup caption=''>
      <Hoverable>
        <CurrentIcon />
      </Hoverable>
      <Hoverable>
        <CurrentIcon />
        <CurrentIcon />
      </Hoverable>
    </ExampleGroup>
  </ExampleCard>
)

export default HoverableExample
