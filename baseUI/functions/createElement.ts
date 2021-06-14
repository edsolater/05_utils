import { CSSProperties } from 'react'
import { toKebabCase } from 'utils/functions/string/changeCase'

export default function _createElementByString<T extends HTMLElement = HTMLDivElement>(
  innerHTMLStr: string
): T {
  const tempNode = document.createElement('div')
  tempNode.innerHTML = innerHTMLStr
  if (tempNode.firstElementChild === null) throw "can't create an element. Wrong string!"
  return tempNode.firstElementChild as any
}

export function createMaskRoot() {
  return _createElementByString(
    '<div id="mask-root" style="position:fixed; inset:0; pointer-events: none"></div>'
  )
}

export function createElement(options?: { className?: string; style?: CSSProperties }) {
  return _createElementByString(
    `<div 
      ${options?.className ? `class="${options.className}"` : ''}
      ${
        options?.style
          ? `style="${Object.entries(options.style)
              .map(([key, value]) => `${toKebabCase(key)}:${value}`)
              .join(';')}"`
          : ''
      }
      ></div>`
  )
}
