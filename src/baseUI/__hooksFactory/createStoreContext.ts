import React, { createContext, useContext, useMemo, useState } from 'react'

type MayStateFn<T> = T | ((old: T) => T)

/**
 * make first letter of word uppercase
 * @param str string(camlCase)
 * @returns  string(PascalCase)
 */
function capitalize(str: string): string {
  if (!str) return ''
  return str[0].toUpperCase() + str.slice(1)
}

const createStoreContext = <T extends { [key: string]: any }>(initStore: T) => {
  type Setters = {
    /**
     * inputState will be merged to the store
     */
    set(inputStore: MayStateFn<Partial<T>>): void
    /**
     * set store to it's default value
     */
    setToInit(): void
  } & {
    [K in `set${Capitalize<Extract<keyof T, string>>}`]: (
      inputStore: MayStateFn<K extends `set${infer O}` ? T[Uncapitalize<O>] : any>
    ) => void
  }
  type ContextValue = {
    storeState: T
    setters: Setters
  }

  const Context = createContext<ContextValue>({
    storeState: initStore,
    setters: {} as any // DANGEROUS: use any force Object type
  })

  return {
    /**
     * It should be add to component tree root(without any props)
     */
    WrappedProvider: (props: { children?: React.ReactNode }): JSX.Element => {
      const [storeState, setEntireStoreState] = useState(initStore)
      const setters = useMemo<Setters>(
        () =>
          ({
            set(inputStore) {
              setEntireStoreState((old) => ({
                ...old,
                ...(typeof inputStore === 'function' ? inputStore(old) : inputStore)
              }))
            },
            setToInit() {
              setEntireStoreState(initStore)
            },
            ...Object.keys(initStore).reduce((acc, name) => {
              acc[`set${capitalize(name)}`] = function (inputState: unknown) {
                setEntireStoreState((old) => ({
                  ...old,
                  [name]: typeof inputState === 'function' ? inputState(old[name]) : inputState
                }))
              }
              return acc
            }, {})
          } as Setters),
        []
      )
      const contextValue = useMemo(() => ({ storeState, setters }), [storeState, setters])
      return React.createElement(Context.Provider, { value: contextValue }, props.children)
    },
    /**
     * use this store. Every xxx will has a corresponding setXxx.(All setter properties will always start with 'set')
     */
    useStore(): T & Setters {
      const store = useContext(Context)
      return { ...store.storeState, ...store.setters }
    },
    /**
     * all states and setters are separate
     */
    useStoreRaw(): ContextValue {
      const store = useContext(Context)
      return store
    }
  }
}
export default createStoreContext
