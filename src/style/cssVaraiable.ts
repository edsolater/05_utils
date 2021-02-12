import isHTMLElement from 'helper/domElement/isHTMLElement'
import { ReactNode } from 'react'

export const cssVariables = {
  '--bg-color': 1,
  '--primary-color': 'hsl(199, 97%, 42%)',
  '--color-gray-100': 'hsl(0, 0%, 96%)',
  '--color-gray-200': 'hsl(0, 0%, 88%)',
  '--color-gray-300': 'hsl(0, 0%, 46%)',
  '--window-video-background-color': '#222'
}
export type AllCSSVariableName = keyof typeof cssVariables

export default cssVariables

// TODO: 我觉得el也应该可以传ReactElement，就是把style附加在根节点上
/**
 * 附加上CSS属性
 * @param el 目标元素
 * @param propertyName 属性名（可能是css variable属性）
 * @param value 属性值
 */
export const setCss = (el: HTMLElement | ReactNode, propertyName: string, value: number | string) =>
  isHTMLElement(el) ? el.style.setProperty(propertyName, value.toString()) : console.log('el: ', el)
