import Icon from 'baseUI/components/Icon'
import AttachHoverable from 'baseUI/components/wrappers/AttachHoverable'
import WrapperInjectProps from 'baseUI/components/wrappers/WrapperInjectProps'
import React from 'react'
import ExampleCard from './ExampleCard'
import ExampleGroup from './ExampleGroup'

/**
 * Icon 的使用示例
 */

function CurrentIcon({ isHovered = false, domRef }: Partial<WrapperInjectProps>) {
  return <Icon domRef={domRef} name={isHovered ? 'smile' : 'close'} />
}

const HoverableExample = () => (
  <ExampleCard category='WrapperComponent' title='Hoverable'>
    <ExampleGroup caption=''>
      <AttachHoverable>
        <CurrentIcon />
      </AttachHoverable>
      <AttachHoverable>
        <CurrentIcon />
        <CurrentIcon />
      </AttachHoverable>
    </ExampleGroup>
  </ExampleCard>
)

export default HoverableExample
