import React from 'react'
import Button from 'baseUI/components/Button'
import ExampleCard from './ExampleCard'
import ExampleGroup from './ExampleGroup'
import createStore from 'baseUI/hooks/createStore'
import AppProviders from 'baseUI/components/Providers'

const { useStore: useContextStore, Provider } = createStore({ count: 1 })
const { useStore: useContextStore2, Provider: Provider2 } = createStore({ count: 1 })

const AppProvidersExample = () => {
  return (
    <AppProviders list={[Provider, { provider: Provider2 }]}>
      <ExampleCard title='_AppProviders' category='SideEffectComponent'>
        <ExampleGroup caption='onClickOutside'>
          <Inner />
        </ExampleGroup>
      </ExampleCard>
    </AppProviders>
  )
}
const Inner = () => {
  const {
    store: { count },
    setters: { setCount }
  } = useContextStore()
  const {
    store: { count: count2 },
    setters: { setCount: setCount2 }
  } = useContextStore2()
  return (
    <>
      you have clicked {count} times
      <Button
        onClick={() => {
          setCount((n) => n + 1)
        }}
      >
        😬
      </Button>

      another: you have clicked {count2} times
      <Button
        onClick={() => {
          setCount2((n) => n + 1)
        }}
      >
        👾
      </Button>
    </>
  )
}

export default AppProvidersExample
