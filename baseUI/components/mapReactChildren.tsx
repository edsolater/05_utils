import React, { isValidElement, ReactElement, ReactNode } from 'react'
import { MayArray } from 'typings/tools'
import { isArray } from 'utils/functions/judgers'

/**
 * 比 React.Children.map 优化了类型、当某个Child并非ReactElement时， 直接返回
 */
export default function mapReactChildren(
  children: MayArray<ReactNode>,
  mapper: (child: ReactElement, index: number) => ReactNode
) {
  return isArray(children) ? (
    <>
      {React.Children.map(children, (child, idx) =>
        isValidElement(child) ? mapper(child, idx) : child
      )}
    </>
  ) : isValidElement(children) ? (
    <>{mapper(children, 0)}</>
  ) : (
    <>{children}</>
  )
}
