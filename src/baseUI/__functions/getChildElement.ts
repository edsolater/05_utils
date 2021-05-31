import React, { ReactElement, ReactNode } from 'react'

type ReactComponent = (...params) => ReactElement | null
/**
 * @example
 * (props.children, _DrawerMask) => child(ReactComonent) // extract the target element in Children
 */
export default function getChildElement<T extends ReactComponent>(
  children: ReactNode,
  targetComponent: T
): ReturnType<T> | undefined {
  return [children]
    .flat(Infinity)
    .find((item) => React.isValidElement(item) && item.type === targetComponent)
}
