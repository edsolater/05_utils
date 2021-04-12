import { css, CSSObject, SerializedStyles } from '@emotion/react'
import flat from 'utils/array/flat'
import isFunction from 'utils/judgers/isFunction'
import isObject from 'utils/judgers/isObject'
import isObjectLiteral from 'utils/judgers/isObjectLiteral'
import pick from 'utils/object/pick'
import separate from 'utils/object/separate'
import { toCSS } from './cssUnits'
import { ICSS, ICSSObject } from './ICSS'
import { mergeDeep } from '../utils/merge'

/**
 * 用在非<Div>的组件上，与toCss目的相反
 * 组合cssMixin
 */
export function mix(...icsses: (ICSS | ((...any: any[]) => ICSS) | undefined | {})[]): ICSS {
  //@ts-expect-error
  return icsses.map((icss) => (isFunction(icss) ? icss() : icss)).filter(isObject)
}

/**在最终解析CSS时，中间件队列 */
const middlewareList = [middlewareCSSTransform]

/**
 * 用在最终的<Div>, 把css-in-js转换给emotion处理
 * @param icss
 */
export function parseCSS(icss: ICSS): SerializedStyles {
  const composed = mergeDeep(icss)
  const middleware = (cssobj: ICSSObject) =>
    middlewareList.reduce((acc, modal) => modal(acc), cssobj)
  const nestedMiddleware = (cssobj: ICSSObject) => {
    const obj = Object.entries(cssobj).reduce((acc, [key, value]) => {
      const computedValue = isObjectLiteral(value) ? nestedMiddleware(value as ICSSObject) : value
      acc[key] = computedValue
      return acc
    }, {})
    return middleware(obj)
  }
  const parsedCSS = composed ? nestedMiddleware(composed) : undefined
  return css(parsedCSS)
}
export type OnlyObject<T> = T extends object ? never : T

/**
 * 处理Transform相关的单独属性
 * @param cssObj 未处理时的cssobject
 * @returns 处理后的cssobject
 */
function middlewareCSSTransform(cssObj: ICSSObject): ICSSObject {
  const [rest, toParse] = separate(cssObj, ['translate', 'scale', 'rotate', 'skew'])
  //@ts-expect-error
  const composedValue: string = Object.entries(toParse).reduce(
    //@ts-expect-error
    (acc, [property, value]: ['translate' | 'scale' | 'rotate' | 'skew', any[]]) =>
      acc +
      (property === 'translate'
        ? `translate(${flat(value).map(toCSS).join(', ') || 0})`
        : property === 'scale'
        ? `scale(${flat(value).join(', ') || 1})`
        : property === 'rotate'
        ? `rotate(${flat(value).join(', ') || 0})`
        : property === 'skew'
        ? `skew(${flat(value).join(', ') || 0})`
        : ''),
    ''
  )
  return { ...rest, ...(composedValue !== '' ? { transform: composedValue } : {}) }
}
