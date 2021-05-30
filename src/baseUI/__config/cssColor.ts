/**
 * @todo 上半部分不随业务而改变，要放到style文件夹下；下半部分直接 _config
 */
const cssColor = {
  red: 'red',
  black: 'hsl(0deg 0% 0%)',
  crimson: 'crimson',
  dodgerblue: 'dodgerblue',
  whitesmoke: '#e0e0e0',
  lightgrey: 'hsl(0deg 0% 83%)',
  transparent: 'transparent',
  darkText: 'hsl(213deg 6% 32%)', // 带有一点蓝
  defaultBackgroundGray: '#666',
  /** 带有一点灰，用于辅助说明 */
  grayText: 'hsl(0deg 0% 20% / 70%)',
  darkMaskLighter: 'hsl(0deg 0% 0% / 8%)',
  whiteCard: 'hsl(0deg 0% 100%)',
} as const
export default cssColor
export type CSSColorString = string
