import React, { createContext, useContext, useMemo, useState } from 'react'

type MayStateFn<T> = T | ((old: T) => T)

/**
 * 首字母大写
 * @param str camlCase的string
 * @returns PascalCase的String
 */
function capitalize(str: string): string {
  if (!str) return ''
  return str[0].toUpperCase() + str.slice(1)
}

const createStoreContext = <T extends { [key: string]: any }>(initStore: T) => {
  type Setters = {
    /**
     * 设定局部State（会自动合并）
     */
    set(inputStore: MayStateFn<Partial<T>>): void
    /**
     * 将store恢复成初始状态
     */
    resetAll(): void
  } & {
    [K in `set${Capitalize<Extract<keyof T, string>>}`]: (
      inputStore: MayStateFn<K extends `set${infer O}` ? T[Uncapitalize<O>] : any>
    ) => void
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
        () =>
          ({
            set(inputStore) {
              setEntireStoreState((old) => ({
                ...old,
                ...(typeof inputStore === 'function' ? inputStore(old) : inputStore)
              }))
            },
            resetAll() {
              setEntireStoreState(initStore)
            },
            ...Object.keys(storeState).reduce((acc, name) => {
              acc[`set${capitalize(name)}`] = function (inputState) {
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

      return <Context.Provider value={contextValue}>{props.children}</Context.Provider>
    },
    /**
     * 特定于此 Provider 的 Context
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
