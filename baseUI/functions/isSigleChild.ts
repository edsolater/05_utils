import { isValidElement, ReactElement, ReactNode } from 'react'
import { isArray } from '@edsolater/fnkit/dist/judgers'

export default function isSigleChild(
  child: ReactNode,
  componentName: string
): asserts child is ReactElement {
  if (isArray(child)) {
    throw new Error(`<${componentName}> can't accept an array of child`)
  }
  if (!isValidElement(child)) {
    throw new Error(`the direct child of <${componentName}> is not ReactElement`)
  }
}
