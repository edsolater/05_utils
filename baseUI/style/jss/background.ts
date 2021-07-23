import { insertCSSRules } from './_parser'

export function isBackground(p: string) {
  return backgroundShortcuts.has(p as any)
}

export function parseBackgroundRule(p: string) {
  if (p == 'bg-cotainer') return insertCSSRules('.' + p, { 'background-size': 'contain' })
  if (p == 'bg-cover') return insertCSSRules('.' + p, { 'background-size': 'cover' })
  if (p == 'bg-auto') return insertCSSRules('.' + p, { 'background-size': 'auto' })

  if (p == 'bg-origin-border') return insertCSSRules('.' + p, { 'background-origin': 'border-box' })
  if (p == 'bg-origin-padding')
    return insertCSSRules('.' + p, { 'background-origin': 'padding-box' })
  if (p == 'bg-origin-content')
    return insertCSSRules('.' + p, { 'background-origin': 'content-box' })

  if (p == 'bg-clip-border') return insertCSSRules('.' + p, { 'background-clip': 'border-box' })
  if (p == 'bg-clip-padding') return insertCSSRules('.' + p, { 'background-clip': 'padding-box' })
  if (p == 'bg-clip-content') return insertCSSRules('.' + p, { 'background-clip': 'content-box' })
  if (p == 'bg-clip-text') return insertCSSRules('.' + p, { 'background-clip': 'text' })

  if (p == 'bg-top') return insertCSSRules('.' + p, { 'background-position': 'top' })
  if (p == 'bg-bottom') return insertCSSRules('.' + p, { 'background-position': 'bottom' })
  if (p == 'bg-left') return insertCSSRules('.' + p, { 'background-position': 'left' })
  if (p == 'bg-right') return insertCSSRules('.' + p, { 'background-position': 'right' })
  if (p == 'bg-center') return insertCSSRules('.' + p, { 'background-position': 'center' })
  if (p == 'bg-top-left') return insertCSSRules('.' + p, { 'background-position': 'top left' })
  if (p == 'bg-top-right') return insertCSSRules('.' + p, { 'background-position': 'top right' })

  if (p == 'bg-repeat') return insertCSSRules('.' + p, { 'background-repeat': 'repeat' })
  if (p == 'bg-no-repeat') return insertCSSRules('.' + p, { 'background-repeat': 'no-repeat' })
  if (p == 'bg-repeat-x') return insertCSSRules('.' + p, { 'background-repeat': 'repeat-x' })
  if (p == 'bg-repeat-y') return insertCSSRules('.' + p, { 'background-repeat': 'repeat-y' })
  if (p == 'bg-repeat-round') return insertCSSRules('.' + p, { 'background-repeat': 'round' })
  if (p == 'bg-repeat-space') return insertCSSRules('.' + p, { 'background-repeat': 'space' })

  /** no bg-opacity, should use js color parser to have transparent color */

  /** no bg-color, all color will be add in jss/color.ts */
}

export const backgroundShortcuts = new Set([
  'bg-cotainer',
  'bg-cover',
  'bg-auto',
  'bg-origin-border',
  'bg-origin-padding',
  'bg-origin-content',
  'bg-clip-border',
  'bg-clip-padding',
  'bg-clip-content',
  'bg-clip-text',
  'bg-top',
  'bg-bottom',
  'bg-left',
  'bg-right',
  'bg-center',
  'bg-top-left',
  'bg-top-right',
  'bg-repeat',
  'bg-no-repeat',
  'bg-repeat-x',
  'bg-repeat-y',
  'bg-repeat-round',
  'bg-repeat-space'
] as const)

export type BackgroundShortcut = typeof backgroundShortcuts extends Set<infer T> ? T : never
