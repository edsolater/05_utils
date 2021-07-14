const cssColor = {
  red: 'red',
  white: 'white',
  black: 'hsl(0deg 0% 0%)',
  gray: 'gray',
  crimson: 'crimson',
  dodgerblue: 'hsl(210deg 100% 56%)',
  dodgerblueLight: 'hsl(210deg 100% 80%)',
  whitesmoke: '#e0e0e0',
  lightgrey: 'hsl(0deg 0% 83%)',
  transparent: 'transparent'
} as const
export default cssColor
export type CSSColorString = string
export type CSSColorName = keyof typeof cssColor

export function isColorName(color: string):color is CSSColorName {
  return Reflect.has(cssColor, color)
}
