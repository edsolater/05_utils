import Button from 'baseUI/Button'
import createStoreContext from 'baseUI/__hooksFactory/createStoreContext'
import React, { useContext } from 'react'
import ExampleCard from './ExampleCard'
import ExampleGroup from './ExampleGroup'

const GlobalStoreExample = () => {
  const { Provider, Context: GlobalStoreContext } = createStoreContext({ count: 1 })
  const { count } = useContext(GlobalStoreContext)
  return (
    <ExampleCard title='GlobalStore' category='hooks'>
      <Provider>
        <ExampleGroup caption='onClickOutside'>
          you have clicked {count} times
          <Button></Button>
        </ExampleGroup>
      </Provider>
    </ExampleCard>
  )
}

export default GlobalStoreExample
