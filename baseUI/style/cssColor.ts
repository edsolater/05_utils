const cssColor = {
  red: 'red',
  white: 'white',
  black: 'hsl(0deg 0% 0%)',
  gray: 'gray',
  crimson: 'crimson',
  dodgerblue: 'dodgerblue', // 'hsl(210deg 100% 56%)'
  dodgerblueLight: 'hsl(210deg 100% 80%)',
  whitesmoke: '#e0e0e0',
  lightgrey: 'hsl(0deg 0% 83%)',
  transparent: 'transparent',
} as const
export default cssColor
export type CSSColorString = string
