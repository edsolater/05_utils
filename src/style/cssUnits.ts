export type CSSValue = number | string
export const toVw = (n: number) => `${n}vw`
export const toVh = (n: number) => `${n}vh`
export const fullVw = '100vw'
export const fullVh = '100vh'

export const toPx = (n: number) => `${n}px`
export const toPe = (n: number) => `${n}%`
export const halfPe = '50%'

export const fromPx = (rule: string): number => parseFloat(rule)
