import isNumberString from 'utils/judgers/isNumberString'

export const rootVariables = {
  '--bg-color': 1,
  '--primary-color': 'hsl(199, 97%, 42%)',
  '--color-gray-100': 'hsl(0, 0%, 96%)',
  '--color-gray-200': 'hsl(0, 0%, 88%)',
  '--color-gray-300': 'hsl(0, 0%, 46%)',
  '--window-video-background-color': '#222'
}
export type AllCSSVariableName = keyof typeof rootVariables

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
export const toCSSVariable = (
  variableName: keyof AvailableCSSVariable | keyof typeof rootVariables,
  fallback?: any
) => `var(${variableName}${fallback ? `, ${fallback}` : ''})`

/**
 * 用JS获取某个节点上的CSS变量
 * @param variableName css变量名
 * @param from 某个节点 [默认为:root 节点]
 */
export const getAttachedCSSVariable = (
  variableName: keyof AvailableCSSVariable | keyof typeof rootVariables | (string & {}),
  from: HTMLElement = document.documentElement
): string | number => {
  const value = from.style.getPropertyValue(variableName)
  return isNumberString(value) ? Number(value) : value
}
