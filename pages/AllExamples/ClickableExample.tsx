import Icon from 'baseUI/components/Icon'
import React from 'react'
import ExampleCard from './ExampleCard'
import ExampleGroup from './ExampleGroup'
import AttachClickable from 'baseUI/components/wrappers/AttachClickable'
import { DivProps } from 'baseUI/components/Div'

/**
 * Icon 的使用示例
 */

function CurrentIcon({ hover = false, domRef }: { hover?: boolean; domRef?: DivProps['domRef'] }) {
  return <Icon domRef={domRef} name={hover ? 'smile' : 'close'} />
}

const ClickableExample = () => (
  <ExampleCard category='WrapperComponent' title='Clickable'>
    <ExampleGroup caption=''>
      <AttachClickable
        onClick={() => {
          globalThis.alert(3)
        }}
      >
        <CurrentIcon />
      </AttachClickable>
    </ExampleGroup>
  </ExampleCard>
)

export default ClickableExample
