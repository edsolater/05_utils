import { mixCSSObjects } from 'baseUI/style/cssParser'
import { GetArrayItem } from 'baseUI/types/generic'
import { createContext, useMemo, useRef } from 'react'
import { cache } from 'utils/functions/functionFactory'

export default function useCSS<T = any>(
  props: T,
  fn: (props: T) => GetArrayItem<Parameters<typeof mixCSSObjects>>,
  additionalDependenceList?: any[]
) {
  const getCSS = useRef(cache((p) => mixCSSObjects(fn(p))))
  const css = useMemo(() => getCSS.current(props), [props, ...(additionalDependenceList ?? [])])
  return css
}

export function useCSS2<T = any>(
  props: T,
  fn: (props: T) => GetArrayItem<Parameters<typeof mixCSSObjects>>,
  additionalDependenceList?: any[]
) {
  const getCSS = useRef(cache((p) => mixCSSObjects(fn(p))))
  const css = useMemo(() => getCSS.current(props), [props, ...(additionalDependenceList ?? [])])
  return css
}

function createGlobalHook<T extends (...any: any[]) => any>(hook: T) {
  const GlobalContext = createContext({ hooks, setHook: (hook) => {} })
  // TODO: 
  const globalHook = (...params) => {
    const use
  }
  /** @component no need props!!  */
  const Registor = () => {}
  //   const Context = createContext({
  //     store: initStoreObject,
  //     setters: {} as any, // DANGEROUS: use any force Object type
  //     actions: {} as any // DANGEROUS: use any force Object type
  //   })
  //   return {
  //     Provider: ({ children }) => {
  //       const [store, setEntireStore] = useState(initStoreObject)
  //       const setters = useMemo(() => getSetters(initStoreObject, setEntireStore), [])
  //       const actions = useMemo(() => getActions(store, setters, options.actions), [
  //         store,
  //         setters,
  //         options.actions
  //       ])
  //       const contextValue = useMemo(() => ({ store, setters, actions }), [store])
  //       return React.createElement(Context.Provider, { value: contextValue }, children)
  //     },
  //     useStore() {
  //       const storeContext = useContext(Context)
  //       return storeContext
  //     }
  //   } as any
  // } else {
  //   // options.storeMode == 'javascript-variable'
  //   const storeVariable = {
  //     state: initStoreObject,
  //     setState(nextState: MayStateFn<any, T>) {
  //       storeVariable.state =
  //         typeof nextState === 'function' ? nextState(storeVariable.state) : nextState
  //       storeVariable.setters.forEach((setter) => setter(storeVariable.state))
  //     },
  //     setters: [] as ((s: T) => void)[]
  //   }

  //   return {
  //     useStore: () => {
  //       const [store, setStore] = useState(storeVariable.state)
  //       const setters = useMemo(() => getSetters(initStoreObject, storeVariable.setState), [])
  //       const actions = useMemo(() => getActions(store, setters, options.actions), [
  //         store,
  //         setters,
  //         options.actions
  //       ])
  //       useEffect(() => {
  //         if (!storeVariable.setters.includes(setStore)) {
  //           storeVariable.setters.push(setStore)
  //         }
  //       })
  //       return { store, setters, actions }
  //     }
  //   } as any
  // }
}
