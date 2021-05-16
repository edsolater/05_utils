import React, { createContext } from 'react'

const createStoreContext = <T extends { [key: string]: any }>(store: T) => {
  
  const Context = createContext(store)
  const Provider = (props: { value?: Partial<T>; children?: React.ReactNode }) => (
    <Context.Provider value={store}>{props.children}</Context.Provider>
  )
  return { Provider, Context }
}
export default createStoreContext
