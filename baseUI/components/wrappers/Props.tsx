import React from 'react'
import { DivProps } from "../baseProps"
import Refs from './Refs'

interface PropsProps extends DivProps {
  [propName: string]: any
}

/**
 * TODO: 这个组件有问题
 * @WrapperComponent add props to it's child
 * @example
 * <Props<{ whole: number }> whole={3}>
 *   <Div />
 * </Props>
 */
export default function Props<P = never>({ children, ...restProps }: PropsProps & P) {
  return <Refs {...restProps}>{children}</Refs>
}
