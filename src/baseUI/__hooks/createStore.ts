import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { shrinkToValue } from 'utils/magic/shrinkToValue'

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
  resetAll(): void
} & {
  [K in `set${Capitalize<Extract<keyof T, string>>}`]: (
    newState: MayStateFn<K extends `set${infer O}` ? T[Uncapitalize<O>] : any, T>
  ) => void
} &
  {
    [K in `reset${Capitalize<Extract<keyof T, string>>}`]: () => void
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
        ...shrinkToValue(inputStore, [oldStore, oldStore])
      }))
    },
    resetAll() {
      setStore(initStore)
    },
    ...Object.keys(initStore).reduce((acc, name) => {
      acc[`set${capitalize(name)}`] = (inputState) => {
        setStore((oldStore) => ({
          ...oldStore,
          [name]: shrinkToValue(inputState, [oldStore[name], oldStore])
        }))
      }
      return acc
    }, {}),
    ...Object.keys(initStore).reduce((acc, name) => {
      acc[`reset${capitalize(name)}`] = () => {
        setStore((oldStore) => ({
          ...oldStore,
          [name]: initStore[name]
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
  setters: Setters<S>,
  actionsTemplate: AOT | undefined
) => {
  if (!actionsTemplate) return {}
  else {
    const actions = Object.entries(actionsTemplate).reduce(
      (acc, [customedEventName, actionTemplateFunction]) => {
        acc[customedEventName] = (...inputArgs) => {
          actionTemplateFunction({ store: currentStore, setters, dangerous_actions: actions })(
            ...inputArgs
          )
        }
        return acc
      },
      {}
    )
    return actions
  }
}

/**
 * Creact a store.
 * No need useContext.
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
  const { storeIn = 'react-context' } = options

  if (storeIn == 'react-context') {
    const Context = createContext({
      store: initStoreObject,
      setters: {} as any, // DANGEROUS: use any force Object type
      actions: {} as any // DANGEROUS: use any force Object type
    })
    return {
      Provider: ({ children }) => {
        const [store, setEntireStore] = useState(initStoreObject)
        const setters = useMemo(() => getSetters(initStoreObject, setEntireStore), [])
        const actions = useMemo(() => getActions(store, setters, options.actions), [
          store,
          setters,
          options.actions
        ])
        const contextValue = useMemo(() => ({ store, setters, actions }), [store])
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
        const [store, setStore] = useState(storeVariable.state)
        const setters = useMemo(() => getSetters(initStoreObject, storeVariable.setState), [])
        const actions = useMemo(() => getActions(store, setters, options.actions), [
          store,
          setters,
          options.actions
        ])
        useEffect(() => {
          if (!storeVariable.setters.includes(setStore)) {
            storeVariable.setters.push(setStore)
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
  const [store, setStore] = useState(initStoreObject)
  const setters = useMemo(() => getSetters(initStoreObject, setStore), [])
  const actions = useMemo(() => getActions(store, setters, options?.actions), [
    store,
    setters,
    options?.actions
  ])
  //@ts-ignore
  return { store, setters, actions }
}
