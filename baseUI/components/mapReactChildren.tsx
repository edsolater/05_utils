import React, { isValidElement, ReactElement, ReactNode } from 'react'
import { MayArray } from 'typings/tools'
import { isArray } from 'utils/functions/judgers'
import { shrinkToValue } from 'utils/functions/magic'

/**
 * 比 React.Children.map 优化了类型、当某个Child并非ReactElement时， 直接返回
 */
export default function cloneElement(
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

type Props = any
/**
 * 这只是cloneElement的快捷方式， 为了能不写 React.cloneElement // 应该是过度设计了
 * @param children
 * @param newProps
 * @returns
 */
export function cloneElements(
  children: MayArray<ReactNode>,
  newProps: Props | ((childIdx: number) => Props)
) {
  return cloneElement(children, (child, idx) =>
    React.cloneElement(child, shrinkToValue(newProps, [idx]))
  )
}
