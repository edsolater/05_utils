import React from 'react'
import Button from 'baseUI/Button'
import createStore from 'baseUI/__hooks/createStore'
import ExampleCard from './ExampleCard'
import ExampleGroup from './ExampleGroup'

const { useStore: useContextStore } = createStore(
  { count: 1, init: false },
  {
    storeIn: 'javascript-variable',
    actions: {
      setInner: ({ setters }) => () => {
        setters.setCount((n) => n + 1)
      },
      hello: ({ dangerous_actions }) => () => {
        dangerous_actions.setInner()
      }
    }
  }
)
const GlobalStoreExample = () => {
  return (
    <ExampleCard title='GlobalStore' category='hooks'>
      <ExampleGroup caption='onClickOutside'>
        <Inner />
      </ExampleGroup>
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
  const {
    store: { count },
    actions: { hello },
    setters: { setCount }
  } = useContextStore()
  return (
    <>
      you have clicked {count} times
      <Button
        onClick={() => {
          setCount((n) => n + 1)
          // hello()
        }}
      ></Button>
    </>
  )
}

export default GlobalStoreExample
