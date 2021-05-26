import React, { FC } from 'react'

// TODO: 没写页面， 只是理论上，这样可以
export interface AppProvidersProps {
  list?: Array<{ provider: any; value?: any }>
}

//@ts-ignore
const _AppProviders: FC<AppProvidersProps> = (props) => {
  const { list = [] } = props
  return list.reduce(
    (acc, { provider, value }) => React.createElement(provider, { value }, acc),
    props.children ?? null
  )
}

export default _AppProviders
