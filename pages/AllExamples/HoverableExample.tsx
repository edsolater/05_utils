import Hoverable from 'baseUI/components/wrappers/Hoverable'
import Icon from 'baseUI/components/Icon'
import React from 'react'
import ExampleCard from './ExampleCard'
import ExampleGroup from './ExampleGroup'
import { parseEx, VerboseProps } from 'baseUI/components/wrappers/Ex'

/**
 * Icon 的使用示例
 */

function _CurrentIcon({ isHovered = false, domRef }: Partial<VerboseProps>) {
  return <Icon domRef={domRef} name={isHovered ? 'smile' : 'close'} />
}
const CurrentIcon = parseEx(_CurrentIcon)

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
