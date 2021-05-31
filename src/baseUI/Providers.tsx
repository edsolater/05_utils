import React, { FC } from 'react'

type Provider = any
/**
 * @SideEffectComponent
 * A register machine for Context.Provider. 
 * It may wrap the whole app. 
 */
//@ts-ignore
const Providers: FC<{ list?: Array<{ provider: Provider; value?: any } | Provider> }> = (props) => {
  const { list = [] } = props
  return list.reduce(
    (acc, providerInfo) =>
      'provider' in providerInfo
        ? React.createElement(providerInfo.provider, { value: providerInfo.value }, acc)
        : React.createElement(providerInfo, {}, acc),
    props.children ?? null
  )
}

export default Providers
