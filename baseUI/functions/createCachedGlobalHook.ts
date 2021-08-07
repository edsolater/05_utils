import React, { ReactNode } from 'react'
import { createContext } from 'react'
import { cache } from '@edsolater/fnkit/dist/functionFactory'

export default function createCachedGlobalHook<T extends (...any: any[]) => any>(
  hook: T,
  {
    errorMsg: msgForNotWrappedInRoot = `U have to wrap the hook: ${hook.name}, to let it global`
  }: { errorMsg?: string } = {}
) {
  const defaultHook = () => {
    throw new Error(msgForNotWrappedInRoot)
  }
  const GlobalContext = createContext((defaultHook as unknown) as T)

  const cachedHook = cache(hook)

  /** @Registor no need props!!  */
  const Registor = ({ children }: { children: ReactNode }) => {
    return React.createElement(GlobalContext.Provider, { value: cachedHook }, children)
  }

  return { hook: cachedHook, Registor }
}
