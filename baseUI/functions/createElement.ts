import { CSSProperties } from 'react'
import { toKebabCase } from 'utils/functions/string/changeCase'

function _createElementByString<T extends HTMLElement = HTMLDivElement>(innerHTMLStr: string): T {
  const tempNode = document.createElement('div')
  tempNode.innerHTML = innerHTMLStr
  if (tempNode.firstElementChild === null) throw "can't create an element. Wrong string!"
  return tempNode.firstElementChild as any
}

export default function createElement(options?: { className?: string; style?: CSSProperties }) {
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
