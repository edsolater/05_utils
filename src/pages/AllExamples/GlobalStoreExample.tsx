import React from 'react'
import Button from 'baseUI/Button'
import createStoreContext from 'baseUI/__hooksFactory/createStoreContext'
import ExampleCard from './ExampleCard'
import ExampleGroup from './ExampleGroup'

const { Provider: WrappedProvider, useContextStoreRaw, useContextStore } = createStoreContext(
  { count: 1, init: false },
  {
    actions: {
      setInner: ({ setters , dangerous_actions}) => () => {
        setters.setCount((n) => n + 1)
      },
      hello: ({ store, dangerous_actions }) => () => {
        dangerous_actions.setInner()
      }
    }
  }
)
const GlobalStoreExample = () => {
  return (
    <ExampleCard title='GlobalStore' category='hooks'>
      <WrappedProvider>
        <ExampleGroup caption='onClickOutside'>
          <Inner />
        </ExampleGroup>
      </WrappedProvider>
    </ExampleCard>
  )
}
const Inner = () => {
  // const store = useContextStoreRaw()
  // const {
  //   store: { count },
  //   // setters: { setCount, resetStore },
  //   actions: { setInner }
  // } = store
  const {count, hello} = useContextStore()
  return (
    <>
      you have clicked {count} times
      <Button
        onClick={() => {
          // setCount((n) => n + 1)
          hello()
        }}
      ></Button>
    </>
  )
}

export default GlobalStoreExample
