import React from 'react'
import Button from 'baseUI/Button'
import createStoreContext from 'baseUI/__hooksFactory/createStoreContext'
import ExampleCard from './ExampleCard'
import ExampleGroup from './ExampleGroup'

const { Provider: WrappedProvider, useContextStoreRaw } = createStoreContext(
  { count: 1, init: false },
  {
    actions: {
      setInner: (store, setters, actions /* TODO: 这边的类型 */) => (n: number) => {
        console.log(2333) /* FIXME 触发了2次数，为什么？ */
        setters.setCount((n) => n + 1)
      },
      hello: (store, setters, actions) => (boolean: boolean): Partial<typeof store> => {
        return store
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
  const store = useContextStoreRaw()
  const {
    store: { count },
    // setters: { setCount, resetStore },
    actions: { setInner }
  } = store
  console.log('2222sadf')
  return (
    <>
      you have clicked {count} times
      <Button
        onClick={() => {
          // setCount((n) => n + 1)
          setInner(4)
        }}
      ></Button>
    </>
  )
}

export default GlobalStoreExample
