import { toPx } from 'helper/manageStyle/withPx'
import isExist from 'utils/judgers/isExist'
import { CSSValue } from './cssUnits'
const toCSS = (v: CSSValue) => (typeof v === 'number' ? toPx(v) : v)

/* ---------------------------------- css变量 --------------------------------- */

export const cssVar = (cssVariableName: string, fallback?: CSSValue) =>
  `var(--${cssVariableName}${fallback ? ', ' + fallback : ''})`

/* --------------------------------- 传统css函数 -------------------------------- */

export const cssCalc = (value: any) => `calc(${value})`

/* ---------------------------- css transform 家族 ---------------------------- */

export const cssTranslate = (v1?: CSSValue, v2?: CSSValue, v3?: CSSValue) =>
  isExist(v1) ? `translate(${[v1, v2, v3].filter(isExist).map(toCSS).join(', ')})` : ''
export const cssScale = (v1?: CSSValue, v2?: CSSValue, v3?: CSSValue) =>
  isExist(v1) ? `scale(${[v1, v2, v3].filter(isExist).join(', ')})` : ''
export const cssTransform = (options: {
  translate?: Parameters<typeof cssTranslate>
  scale?: Parameters<typeof cssScale>
}) => [cssTranslate(...(options.translate ?? [])), cssScale(...(options.scale ?? []))].join(' ')
