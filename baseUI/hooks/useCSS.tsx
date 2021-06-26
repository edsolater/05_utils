import { mixCSSObjects } from 'baseUI/style/cssParser'
import { GetArrayItem } from 'baseUI/types/generic'
import { useMemo, useRef } from 'react'
import { cache } from 'utils/functions/functionFactory'
import createCachedGlobalHook from '../functions/createCachedGlobalHook'

export default function useCSS<T = any>(
  props: T,
  fn: (props: T) => GetArrayItem<Parameters<typeof mixCSSObjects>>,
  additionalDependenceList?: any[]
) {
  const getCSS = useRef(cache((p) => mixCSSObjects(fn(p))))
  const css = useMemo(() => getCSS.current(props), [props, ...(additionalDependenceList ?? [])])
  return css
}

export const { Registor, hook: useCSS2 } = createCachedGlobalHook(useCSS, {
  errorMsg: 'Regist useCSS to let baseUI work!!! (this action will improve a greate performance!)'
})
