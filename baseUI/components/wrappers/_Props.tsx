import React from 'react'
import { DivProps } from '../Div'
import _DomRef from './_DomRef'

interface _PropsProps extends DivProps {
  [propName: string]: any
}

/**
 * @WrapperComponent add props to it's child
 * @example
 * <_Props<{ whole: number }> whole={3}>
 *   <Div />
 * </_Props>
 */
export default function _Props<P = never>({ children, ...restProps }: _PropsProps & P) {
  return <_DomRef {...restProps}>{children}</_DomRef>
}
