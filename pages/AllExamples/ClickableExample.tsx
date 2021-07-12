import Icon from 'baseUI/components/Icon'
import React from 'react'
import ExampleCard from './ExampleCard'
import ExampleGroup from './ExampleGroup'
import { ExProps } from 'baseUI/components/wrappers/Ex'
import AttachButtonLike from 'baseUI/components/wrappers/AttachButtonLike'

/**
 * Icon 的使用示例
 */

function CurrentIcon({ isHovered, css, domRef }: ExProps) {
  return <Icon css={css} domRef={domRef} name={isHovered ? 'smile' : 'close'} />
}

const ClickableExample = () => (
  <ExampleCard category='WrapperComponent' title='Clickable'>
    <ExampleGroup caption=''>
      <AttachButtonLike
        onClick={() => {
          globalThis.alert(3)
        }}
      >
        <CurrentIcon />
      </AttachButtonLike>
    </ExampleGroup>
  </ExampleCard>
)

export default ClickableExample
