import Hoverable from 'baseUI/components/wrappers/Hoverable'
import Icon from 'baseUI/components/Icon'
import React from 'react'
import ExampleCard from './ExampleCard'
import ExampleGroup from './ExampleGroup'
import { IRefs } from 'baseUI/functions/mergeRefs'

/**
 * Icon 的使用示例
 */

function CurrentIcon({ hover = false, domRef }: { hover?: boolean; domRef?: IRefs<HTMLDivElement> }) {
  return <Icon domRef={domRef} name={hover ? 'smile' : 'close'} />
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
