import React, { createContext, useContext, useMemo, useState } from 'react'

const createStoreContext = <T extends { [key: string]: any }>(initStore: T) => {
  type Setters = {
    /**
     * 设定局部State（会自动合并）
     */
    set(inputStore: Partial<T> | ((store: T) => Partial<T>)): void
    /**
     * 将store恢复成初始状态
     */
    resetAll(): void
  }
  type ContextInitValue = {
    storeState: T
    setters: Setters
  }

  const Context = createContext<ContextInitValue>({
    storeState: initStore,
    setters: {} as any // TODO
  })

  return {
    /**
     * 直接安装在父节点上的Provider（无需也不应该用props）
     */
    WrappedProvider: (props: { children?: React.ReactNode }): JSX.Element => {
      const [storeState, setEntireStoreState] = useState(initStore)
      const setters = useMemo<Setters>(
        () => ({
          set(inputStore) {
            const store = typeof inputStore === 'function' ? inputStore(storeState) : inputStore
            console.log('store__input: ', store)
            setEntireStoreState((old) => ({ ...old, ...store }))
          },
          resetAll() {
            setEntireStoreState(initStore)
          }
        }),
        [storeState]
      )
      const contextValue = useMemo(() => ({ storeState, setters }), [storeState, setters])

      return <Context.Provider value={contextValue}>{props.children}</Context.Provider>
    },
    /**
     * 特供于此Context，
     */
    useStore<B>(options?: {
      /**
       * 设置则返回不经过自动合并的 `{storeState: T; setters: Setters}` 对象
       */
      twoParts?: B
    }): B extends true ? ContextInitValue : T & Setters {
      const store = useContext(Context)
      // @ts-expect-error typescript 的类型推断在这里还不够智能
      return options?.twoParts ? store : { ...store.storeState, ...store.setters }
    }
  }
}
export default createStoreContext
