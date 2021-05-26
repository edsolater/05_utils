import React, { FC } from 'react'

type Provider = any

// TODO: 没写页面， 只是理论上，这样可以
export interface AppProvidersProps {
  list?: Array<{ provider: Provider; value?: any } | Provider>
}

//@ts-ignore
const _AppProviders: FC<AppProvidersProps> = (props) => {
  const { list = [] } = props
  return list.reduce(
    (acc, providerInfo) =>
      'provider' in providerInfo
        ? React.createElement(providerInfo.provider, { value: providerInfo.value }, acc)
        : React.createElement(providerInfo, {}, acc),
    props.children ?? null
  )
}

export default _AppProviders
