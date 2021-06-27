import { isValidElement, ReactElement, ReactNode } from 'react'
import { isArray } from 'utils/functions/judgers'

export default function assertSigleChild(
  children: ReactNode,
  componentName: string
): asserts children is ReactElement {
  if (isArray(children)) {
    throw new Error(`<${componentName}> can't accept an array of child`)
  }
  if (!isValidElement(children)) {
    throw new Error(`the direct child of <${componentName}> is not ReactElement`)
  }
}
