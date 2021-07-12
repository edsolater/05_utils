import Icon from 'baseUI/components/Icon'
import AttachHoverable from 'baseUI/components/wrappers/AttachHoverable'
import { ExProps } from 'baseUI/components/wrappers/Ex'
import React from 'react'
import ExampleCard from './ExampleCard'
import ExampleGroup from './ExampleGroup'

/**
 * Icon 的使用示例
 */

function CurrentIcon({ isHovered = false, domRef, css }: ExProps) {
  return <Icon css={css} domRef={domRef} name={isHovered ? 'smile' : 'close'} />
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
