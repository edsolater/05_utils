import React, { isValidElement, ReactElement, ReactNode } from 'react'
import { MayArray } from 'typings/tools'
import { isArray } from '@edsolater/fnkit/dist/judgers'

/**
 * 比 React.Children.map 优化了类型、当某个Child并非ReactElement时， 直接返回
 * 但
 */
export default function mapChildren(
  children: MayArray<ReactNode>,
  mapper: (child: ReactElement, index: number) => ReactNode
): JSX.Element {
  // @ts-expect-error type has wrong infer, so I force it
  return isArray(children)
    ? React.Children.map(children, (child, idx) =>
        isValidElement(child) ? mapper(child, idx) : child
      )
    : isValidElement(children)
    ? mapper(children, 0)
    : children
}
