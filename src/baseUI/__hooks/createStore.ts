import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import addDefault from 'utils/object/addDefault'

type MayStateFn<T, S extends StoreTemplate> = T | ((prev: T, store: S) => T)

type StoreTemplate = { [key: string]: any }

type Setters<T extends StoreTemplate> = {
  /**
   * inputState will be merged to the store
   */
  set(piece: MayStateFn<Partial<T>, T>): Partial<T> | void
  /**
   * set store to it's default value
   */
  resetStore(): Partial<T> | void
} & {
  [K in `set${Capitalize<Extract<keyof T, string>>}`]: (
    newState: MayStateFn<K extends `set${infer O}` ? T[Uncapitalize<O>] : any, T>
  ) => Partial<T> | void
}

type ActionOptionFunction<T extends StoreTemplate, W = any> = (storeInfo: {
  store: T
  setters: Setters<T>
  /**
   * Avoid to use if You can
   * It's type is not well!!!
   */
  dangerous_actions: W
}) => (...args: any[]) => Partial<T> | void

type ActionOptionTemplate<T extends StoreTemplate, W = any> = {
  [actionName: string]: ActionOptionFunction<T, W>
}

type RuntimeActions<W extends ActionOptionTemplate<any, any>> = {
  [ActionName in keyof W]: ReturnType<W[ActionName]>
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

const getSetters = <S extends StoreTemplate>(
  initStore: S,
  setStore: React.Dispatch<React.SetStateAction<S>>
): Setters<S> =>
  ({
    set(inputStore) {
      setStore((oldStore) => ({
        ...oldStore,
        ...(typeof inputStore === 'function' ? inputStore(oldStore, oldStore) : inputStore)
      }))
    },
    resetStore() {
      setStore(initStore)
    },
    ...Object.keys(initStore).reduce((acc, name) => {
      acc[`set${capitalize(name)}`] = (inputState) => {
        setStore((oldStore) => ({
          ...oldStore,
          [name]:
            typeof inputState === 'function' ? inputState(oldStore[name], oldStore) : inputState
        }))
      }
      return acc
    }, {})
  } as Setters<S>)

const getActions = <
  S extends StoreTemplate,
  AOT extends ActionOptionTemplate<S, any /* TODO: 这里引用自身并不会正确推断 */>
>(
  currentStore: S,
  setStore: React.Dispatch<React.SetStateAction<S>>,
  setters: Setters<S>,
  actionsTemplate: AOT | undefined
) => {
  if (!actionsTemplate) return {}
  else {
    return Object.entries(actionsTemplate).reduce((acc, [customedEventName, returnFn]) => {
      acc[customedEventName] = (...inputArgs) => {
        //使用store而不是oldStore， 是因为， 第一次调用setEntireStore， 总会重渲染2次
        // @ts-ignore
        const result = returnFn({ store: currentStore, setters, dangerous_actions: actions })(
          ...inputArgs
        )
        if (result)
          setStore((oldStore) => ({
            ...oldStore,
            ...result
          }))
      }
      return acc
    }, {})
  }
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
export default function createStore<
  T extends StoreTemplate,
  AOT extends ActionOptionTemplate<T, any /* TODO: 这里引用自身并不会正确推断 */>,
  UseContext extends 'react-context' | 'javascript-variable' | undefined = undefined
>(
  initStoreObject: T,
  options: {
    actions?: AOT
    storeIn?: UseContext
  } = {}
): {
  useStore(): {
    store: T
    setters: Setters<T>
    actions: RuntimeActions<AOT>
  }
} & (typeof options.storeIn extends 'react-context' | undefined
  ? {
      /**
       * It should be add to component tree root(without any props)
       */
      Provider: (props: { children?: React.ReactNode }) => JSX.Element
    }
  : {}) {
  addDefault(options, {
    //@ts-expect-error
    storeIn: 'react-context'
  })

  if (options.storeIn == 'react-context') {
    const Context = createContext({
      store: initStoreObject,
      setters: {} as any, // DANGEROUS: use any force Object type
      actions: {} as any // DANGEROUS: use any force Object type
    })
    return {
      Provider: ({ children }) => {
        const [store, setEntireStore] = useState(initStoreObject)
        const setters = useMemo(() => getSetters(initStoreObject, setEntireStore), [])
        const actions = useMemo(() => getActions(store, setEntireStore, setters, options.actions), [
          store,
          setters,
          options.actions
        ])
        const contextValue = useMemo(() => ({ store, setters, actions }), [store])
        // @ts-ignore
        return React.createElement(Context.Provider, { value: contextValue }, children)
      },
      useStore() {
        const storeContext = useContext(Context)
        return storeContext
      }
    } as any
  } else {
    // options.storeMode == 'javascript-variable'
    const storeVariable = {
      state: initStoreObject,
      setState(nextState: MayStateFn<any, T>) {
        storeVariable.state =
          typeof nextState === 'function' ? nextState(storeVariable.state) : nextState
        storeVariable.setters.forEach((setter) => setter(storeVariable.state))
      },
      setters: [] as ((s: T) => void)[]
    }

    return {
      useStore: () => {
        const [store, stateSetter] = useState(storeVariable.state)
        const setters = useMemo(() => getSetters(initStoreObject, storeVariable.setState), [])
        const actions = useMemo(
          () => getActions(store, storeVariable.setState, setters, options.actions),
          [store, setters, options.actions]
        )
        useEffect(() => {
          if (!storeVariable.setters.includes(stateSetter)) {
            storeVariable.setters.push(stateSetter)
          }
        })
        return { store, setters, actions }
      }
    } as any
  }
}

/**
 * it is like createStore. But acutally, this is just useState.
 * @param initStoreObject 
 * @param options 
 * @returns 
 */
export function useStoreState<
  T extends StoreTemplate,
  AOT extends ActionOptionTemplate<T, any /* TODO: 这里引用自身并不会正确推断 */>
>(
  initStoreObject: T,
  options?: { actions: AOT }
): {
  store: T
  setters: Setters<T>
  actions: RuntimeActions<AOT>
} {
  const [store, stateSetter] = useState(initStoreObject)
  const setters = useMemo(() => getSetters(initStoreObject, stateSetter), [])
  const actions = useMemo(() => getActions(store, stateSetter, setters, options?.actions), [
    store,
    setters,
    options?.actions
  ])
  //@ts-ignore
  return { store, setters, actions }
}
