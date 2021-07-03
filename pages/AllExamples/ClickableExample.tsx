import Clickable from 'baseUI/components/wrappers/Clickable'
import Icon from 'baseUI/components/Icon'
import React from 'react'
import ExampleCard from './ExampleCard'
import ExampleGroup from './ExampleGroup'
import { IRefs } from 'baseUI/functions/mergeRefs'

/**
 * Icon 的使用示例
 */

function CurrentIcon({
  hover = false,
  domRef
}: {
  hover?: boolean
  domRef?: IRefs<HTMLDivElement>
}) {
  return <Icon domRef={domRef} name={hover ? 'smile' : 'close'} />
}

const ClickableExample = () => (
  <ExampleCard category='WrapperComponent' title='Clickable'>
    <ExampleGroup caption=''>
      <Clickable
        onClick={() => {
          globalThis.alert(3)
        }}
      >
        <CurrentIcon />
      </Clickable>
    </ExampleGroup>
  </ExampleCard>
)

export default ClickableExample
