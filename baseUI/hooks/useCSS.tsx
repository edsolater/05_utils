import { mixCSSObjects } from 'baseUI/style'
import { GetArrayItem } from 'baseUI/typing'
import { useMemo, useRef } from 'react'
import { cache } from 'utils/functions/functionFactory'

export function useCSS<T = any>(
  props: T,
  fn: (props: T) => GetArrayItem<Parameters<typeof mixCSSObjects>>
) {
  const getCSS = useRef(cache((p) => mixCSSObjects(fn(p))))
  const css = useMemo(() => getCSS.current(props), [props])
  return css
}
