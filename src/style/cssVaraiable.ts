import isFunction from 'utils/judgers/isFunction'

export const rootVariables = {
  '--bg-color': 1,
  '--primary-color': 'hsl(199, 97%, 42%)',
  '--color-gray-100': 'hsl(0, 0%, 96%)',
  '--color-gray-200': 'hsl(0, 0%, 88%)',
  '--color-gray-300': 'hsl(0, 0%, 46%)',
  '--window-video-background-color': '#222'
}
export type CSSVariableName =
  | keyof AvailableCSSVariable
  | keyof typeof rootVariables
  | (string & {})

export interface AvailableCSSVariable {
  /**
   * 给translate的，表示在x轴偏移的方向
   */
  '--x'?: number
  /**
   * 给translate的，表示在y轴偏移的方向
   */
  '--y'?: number
}

/**
 * 设定CSS Variable
 */
export function setCSSVariable(
  el: HTMLElement | null,
  variableName: string,
  value: number | string | ((original: string) => string | number)
) {
  const willSetValue = isFunction(value) ? value(fromCSSVariable(el, variableName)) : value
  el?.style.setProperty(variableName, `${willSetValue}`)
}

/**
 * 获取CSS Variable
 */
export function fromCSSVariable<T>(
  el: HTMLElement | null,
  variableName: string,
  parser?: (value: string) => T
): T extends Object ? T : string {
  const gettedValue = el?.style.getPropertyValue(variableName) ?? ''
  //@ts-ignore
  return parser ? parser(gettedValue) : gettedValue
}
