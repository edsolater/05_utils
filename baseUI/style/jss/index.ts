import { CSSProperties } from 'react'
import { toKebabCase } from 'utils/functions/string/changeCase'
import { toCssValue } from '../cssUnits'
import { isBackground, parseBackgroundRule } from './background'
import { insertCSSRules } from './_parser'

export const JSS = new Proxy(
  { _description: 'jss atom generator. Shortcuts(Tailwindcss style, with JIT)' },
  {
    get: (target, p: string) => {
      if (isBackground(p)) return parseBackgroundRule(p)
    }
  }
)

export const JSSC = new Proxy(
  { _description: 'jss atom generator. Full css(CSS style, to pass any word)' },
  {
    get: (target, p: string) => {
      return new Proxy((cssValue: string | number) => {}, {
        apply(target, thisArg, argArry) {
          return insertCSSRules('.' + p, { [toKebabCase(p)]: toCssValue(argArry[0]) })
        }
      })
    }
  }
) as {
  [P in keyof CSSProperties]: (cssValue: string | number) => void
}
