import React, { createContext, useContext, useMemo, useState } from 'react'

type MayStateFn<T, S extends StoreTemplate> = T | ((prev: T, store: S) => T)

type StoreTemplate = { [key: string]: any }
type StorePiece<T extends StoreTemplate> = Partial<T>

type Setters<T extends StoreTemplate> = {
  /**
   * inputState will be merged to the store
   */
  set(piece: MayStateFn<StorePiece<T>, T>): StorePiece<T> | void
  /**
   * set store to it's default value
   */
  resetStore(): StorePiece<T> | void
} & {
  [K in `set${Capitalize<Extract<keyof T, string>>}`]: (
    newState: MayStateFn<K extends `set${infer O}` ? T[Uncapitalize<O>] : any, T>
  ) => StorePiece<T> | void
}

type ActionOptionTemplate<T extends StoreTemplate, W> = {
  [actionName: string]: (
    store: T,
    setters: Setters<T>,
    actions: W
  ) => (...args: any[]) => StorePiece<T> | void
}
type ActionFinalTemplate<T extends StoreTemplate, W extends ActionOptionTemplate<T, any>> = {
  [K in keyof ActionOptionTemplate<T, W>]: (
    ...args: Parameters<ReturnType<ActionOptionTemplate<T, W>[K]>>
  ) => void
}
type FromActionOptionTemplate<W extends ActionOptionTemplate<any, any>> = {
  [ActionName in keyof W]: ReturnType<W[ActionName]>
}

type ThisStoreContext<T extends StoreTemplate, W extends ActionOptionTemplate<T, any>> = {
  store: T
  setters: Setters<T>
  actions: FromActionOptionTemplate<W>
}

/**
 * make first letter of word uppercase
 * @param str string(camlCase)
 * @returns  string(PascalCase)
 */
function capitalize(str: string): Capitalize<string> {
  if (!str) return ''
  return str[0].toUpperCase() + str.slice(1)
}

/**
 * Creact a store use react context.
 * No need useContext from now on.
 *
 * @param initStoreObject pass init states here
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
const createStoreContext = <T extends StoreTemplate, AOT extends ActionOptionTemplate<T, any>>(
  initStoreObject: T,
  options?: {
    actions?: AOT
  }
): {
  Provider: (props: { children?: React.ReactNode }) => JSX.Element
  useContextStore(): T & Setters<T> & FromActionOptionTemplate<AOT>
  useContextStoreRaw(): ThisStoreContext<T, AOT>
} => {
  const Context = createContext<ThisStoreContext<T, AOT>>({
    store: initStoreObject,
    setters: {} as any, // DANGEROUS: use any force Object type
    actions: {} as any // DANGEROUS: use any force Object type
  })

  return {
    /**
     * It should be add to component tree root(without any props)
     */
    Provider: (props) => {
      const [store, setEntireStore] = useState(initStoreObject)
      console.log('reC: ')

      console.log('store: ', store)
      const setters = useMemo<Setters<T>>(
        () =>
          ({
            set(inputStore) {
              setEntireStore((oldStore) => ({
                ...oldStore,
                ...(typeof inputStore === 'function' ? inputStore(oldStore, oldStore) : inputStore)
              }))
            },
            resetStore() {
              setEntireStore(initStoreObject)
            },
            ...Object.keys(initStoreObject).reduce((acc, name) => {
              acc[`set${capitalize(name)}`] = (inputState) => {
                setEntireStore((oldStore) => ({
                  ...oldStore,
                  [name]:
                    typeof inputState === 'function'
                      ? inputState(oldStore[name], oldStore)
                      : inputState
                }))
              }
              return acc
            }, {})
          } as Setters<T>),
        []
      )

      const actions = useMemo(
        () =>
          Object.entries(options?.actions ?? {}).reduce((acc, [customedEventName, returnFn]) => {
            acc[customedEventName] = (...inputArgs: Parameters<ReturnType<typeof returnFn>>) => {
              //使用store而不是oldStore， 是因为， 第一次调用setEntireStore， 总会重渲染2次
              const result = returnFn(store, setters, actions)(...inputArgs)
              if (result)
                setEntireStore((oldStore) => ({
                  ...oldStore,
                  ...result
                }))
            }
            return acc
          }, {}) as ActionFinalTemplate<T, AOT>,
        []
      )
      const contextValue = useMemo(() => ({ store, setters, actions }), [store])
      // @ts-ignore
      return React.createElement(Context.Provider, { value: contextValue }, props.children)
    },
    /**
     * use this store. Every xxx will has a corresponding setXxx.(All setter properties will always start with 'set')
     */
    useContextStore() {
      const store = useContext(Context)
      return {
        ...store.store,
        ...store.setters,
        ...store.actions
      }
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
