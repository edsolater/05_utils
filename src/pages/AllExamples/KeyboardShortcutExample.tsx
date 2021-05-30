import React, { useEffect } from 'react'
import ExampleCard from './ExampleCard'
import ExampleGroup from './ExampleGroup'
import KeyboardShortcut, { ShortcutItem, useKeyboardShortcut } from 'baseUI/KeyboardShortcut'
import Div from 'baseUI/Div'
import cssColor from 'baseUI/__config/cssColor'

const KeyboardShortcutExample = () => {
  return (
    <KeyboardShortcut>
      <ExampleCard title='KeyboardShortcut' category='JSComponent'>
        <ExampleGroup caption='basic'>
          <Inner />
        </ExampleGroup>
      </ExampleCard>
    </KeyboardShortcut>
  )
}
const Inner = () => {
  const { registShortcut } = useKeyboardShortcut()
  useEffect(() => {
    registShortcut(new ShortcutItem({
      key: 'shift+r',
      callback: () => {
        console.log('you press r')
      }
    }))
  }, [])
  return (
    <Div css={{ padding: '16px 32px', background: cssColor.lightgrey }}>
      Press R. See console panel
    </Div>
  )
}

export default KeyboardShortcutExample
