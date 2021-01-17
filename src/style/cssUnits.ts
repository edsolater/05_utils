export const toVw = (n: number) => `${n}vw`
export const toVh = (n: number) => `${n}vh`
export const fullVw = '100vw'
export const fullVh = '100vh'

export const toPx = (n: number) => `${n}px`

export const fromPx = (rule: string): number => parseFloat(rule)
