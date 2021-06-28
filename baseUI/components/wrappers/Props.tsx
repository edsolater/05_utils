import React from 'react'
import { DivProps } from '../Div'
import DomRef from './DomRef'

interface PropsProps extends DivProps {
  [propName: string]: any
}

/**
 * @WrapperComponent add props to it's child
 * @example
 * <Props<{ whole: number }> whole={3}>
 *   <Div />
 * </Props>
 */
export default function Props<P = never>({ children, ...restProps }: PropsProps & P) {
  return <DomRef {...restProps}>{children}</DomRef>
}
