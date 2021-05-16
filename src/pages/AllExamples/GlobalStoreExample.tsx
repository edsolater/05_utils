import React from 'react'
import Button from 'baseUI/Button'
import createStoreContext from 'baseUI/__hooksFactory/createStoreContext'
import ExampleCard from './ExampleCard'
import ExampleGroup from './ExampleGroup'

const { Provider: WrappedProvider, useStore } = createStoreContext({ count: 1, init: false })
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
  const store = useStore()
  const { count, set, setCount, setInit } = store
  return (
    <>
      you have clicked {count} times
      <Button
        onClick={() => {
          setCount((n) => n + 1)
        }}
      ></Button>
    </>
  )
}

export default GlobalStoreExample
