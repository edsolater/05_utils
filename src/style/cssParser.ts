import { css, CSSObject } from '@emotion/react'
import flat from 'utils/array/flat'
import isFunction from 'utils/judgers/isFunction'
import isObject from 'utils/judgers/isObject'
import pick from 'utils/object/pick'
import { cssBrightness, cssScale } from './cssFunctions'
import { toCSS } from './cssUnits'
import { ICSS } from './ICSS'

export type AllMixinNames = keyof typeof cssMixins
type MixinFunction = (...any: any[]) => ICSS
// TODO: 放预定义的各种CSS组合
export const cssMixins = {
  gridItemTextLabel: (opt: { fontSize?: CSSObject['fontSize'] } = {}) =>
    ICSS(
      {
        textAlign: 'center',
        left: '50%',
        top: 0,
        fontSize: opt.fontSize ?? 34,
        margin: 8,
        color: 'gray'
      },
      '业务样式：测试的文字'
    ),
  testGridContainer: () =>
    ICSS(
      {
        display: 'grid',
        gridTemplate: '1fr 1fr / 1fr 1fr 1fr',
        gap: 8,
        overflow: 'hidden',
        background: 'lightgray',
        height: '100vh'
      },
      '业务样式： 网格的父盒子'
    ),
  testGridItem: () =>
    ICSS({
      background: 'white',
      position: 'relative',
      overflow: 'hidden'
    }),

  /**禁止 flexItem 伸缩 */
  solidFlexItem: () =>
    ICSS({
      flex: '0 0 auto'
    }),

  /**组件禁用滚动条 */
  noScrollbar: () =>
    ICSS({
      scrollbarWidth: 'none',
      '::-webkit-scrollbar': {
        display: 'none'
      }
    }),

  /**横向布局 */
  horizontalLayout: ({
    gap = 8,
    justifyContent = 'center'
  }: {
    gap?: CSSObject['gap']
    justifyContent?: CSSObject['justifyContent']
  } = {}) =>
    ICSS({
      display: 'flex',
      justifyContent,
      gap
    }),

  /**表明此元素是个button */
  buttonStyle: ({}: {} = {}) =>
    ICSS({
      cursor: 'pointer',
      userSelect: 'none',
      ':hover': {
        filter: cssBrightness(0.9),
        transform: cssScale(1.1)
      },
      ':active': {
        filter: cssBrightness(0.8),
        transform: cssScale(0.9)
      }
    })
}
/**
 * 用在非<Div>的组件上，与toCss目的相反
 * 组合cssMixin
 */
export function mix(...icsses: (ICSS | MixinFunction | undefined | {})[]): ICSS {
  //@ts-expect-error
  return icsses.map((icss) => (isFunction(icss) ? icss() : icss)).filter(isObject)
}
/**
 * 用在最终的<Div>, 把css-in-js转换给emotion处理
 * @param icss
 */
export function divParseCSS(icss: ICSS) {
  const newIcss: CSSObject[] = [icss].flat(Infinity).filter(Boolean)
  const parsedIcss: ICSS = [newIcss, getTransform(newIcss)]
  return css(parsedIcss)
}
function getTransform(cssArr: CSSObject[]): ICSS {
  const transformValue = cssArr
    .map((cssObject) => pick(cssObject, ['translate', 'scale', 'rotate', 'skew']))
    .map((obj) =>
      Object.entries(obj).reduce(
        //@ts-ignore
        (acc, [property, value]: ['translate' | 'scale' | 'rotate' | 'skew', any[]]) =>
          acc +
          (property === 'translate'
            ? `translate(${flat(value).map(toCSS).join(', ')})`
            : property === 'scale'
            ? `scale(${flat(value).join(', ')})`
            : property === 'rotate'
            ? `rotate(${flat(value).join(', ')})`
            : property === 'skew'
            ? `skew(${flat(value).join(', ')})`
            : ''),
        ''
      )
    )
    .join(' ')
  return { transform: transformValue }
}
