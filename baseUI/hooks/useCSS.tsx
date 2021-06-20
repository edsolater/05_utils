import { mixCSSObjects } from 'baseUI/style/cssParser'
import { GetArrayItem } from 'baseUI/types/generic'
import { useMemo, useRef } from 'react'
import { cache } from 'utils/functions/functionFactory'

export default function useCSS<T = any>(
  props: T,
  fn: (props: T) => GetArrayItem<Parameters<typeof mixCSSObjects>>,
  additionalDependenceList?: any[]
) {
  const getCSS = useRef(cache((p) => mixCSSObjects(fn(p))))
  const css = useMemo(() => getCSS.current(props), [props, ...(additionalDependenceList ?? [])])
  return css
}
