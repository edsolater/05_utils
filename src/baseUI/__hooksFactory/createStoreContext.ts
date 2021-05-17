import React, { createContext, useContext, useMemo, useState } from 'react'

type MayStateFn<T> = T | ((old: T) => T)
type StoreInitState = { [key: string]: any }
type StoreSetters<T extends StoreInitState> = {
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
type StoreContext<T extends StoreInitState> = {
  storeState: T
  setters: StoreSetters<T>
}

/**
 * make first letter of word uppercase
 * @param str string(camlCase)
 * @returns  string(PascalCase)
 */
function capitalize(str: string): string {
  if (!str) return ''
  return str[0].toUpperCase() + str.slice(1)
}

/**
 * Creact a store use react context.
 * No need useContext from now on.
 *
 * @param initStore pass init states here
 * @returns
 * 1. Provider(just wrapped in Root level.no props need)
 * 2. useStore -- a hook to exact state and setters in Provider.(state and setters will merge into a big object)
 * 3. useStoreRaw -- a hook to exact state and setters in Provider.(state and setters will NOT merge)
 * @example
 * // in parent component
 * const { Provider, useStore } = createStoreContext({ count: 1, init: false })
 * return <Provider>{props.children}</Provider>
 *
 * // in child component
 * cosnt { count, setCount } = useStore()
 *
 */
const createStoreContext = <T extends StoreInitState>(
  initStore: T
): {
  Provider: (props: { children?: React.ReactNode }) => JSX.Element
  useContextStore(): T & StoreSetters<T>
  useContextStoreRaw(): StoreContext<T>
} => {
  const Context = createContext<StoreContext<T>>({
    storeState: initStore,
    setters: {} as any // DANGEROUS: use any force Object type
  })

  return {
    /**
     * It should be add to component tree root(without any props)
     */
    Provider: (props) => {
      const [storeState, setEntireStoreState] = useState(initStore)
      const setters = useMemo(
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
              acc[`set${capitalize(name)}`] = function (inputState) {
                setEntireStoreState((old) => ({
                  ...old,
                  [name]: typeof inputState === 'function' ? inputState(old[name]) : inputState
                }))
              }
              return acc
            }, {})
          } as StoreSetters<T>),
        []
      )
      const contextValue = useMemo(() => ({ storeState, setters }), [storeState, setters])
      return React.createElement(Context.Provider, { value: contextValue }, props.children)
    },
    /**
     * use this store. Every xxx will has a corresponding setXxx.(All setter properties will always start with 'set')
     */
    useContextStore() {
      const store = useContext(Context)
      return { ...store.storeState, ...store.setters }
    },
    /**
     * all states and setters are separate
     */
    useContextStoreRaw() {
      const store = useContext(Context)
      return store
    }
  }
}
export default createStoreContext