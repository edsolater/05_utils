/**
 * @todo 有一部分要放到style文件夹下，一部分直接 _config
 */
 const cssColor = {
  red: 'red',
  crimson: 'crimson',
  dodgerblue: 'dodgerblue',
  whitesmoke: '#e0e0e0',
  lightgrey: 'hsl(0deg 0% 83%)',
  transparent: 'transparent',
  darkText: 'hsl(213deg 6% 32%)', // 带有一点蓝
  defaultBackgroundGray: '#666',
  /** 带有一点灰，用于辅助说明 */
  grayText: 'hsl(0deg 0% 20% / 70%)',
  darkMask: 'hsl(0deg 0% 0% / 17%)',
  darkMaskLighter: 'hsl(0deg 0% 0% / 8%)'
} as const
export default cssColor
export type CSSColorString = string

// IDEA: 根据UX相关设计软件，也需要管理字体，也就是说，还需要个cssFont对象
