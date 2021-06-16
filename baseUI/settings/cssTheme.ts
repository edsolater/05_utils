const shadow = {
  smooth: [
    '0px 4px 16px rgba(0, 0, 0, 0.1)',
    '0px 8px 32px rgba(0, 0, 0, 0.05)',
    '0px 16px 64px rgba(0, 0, 0, 0.025)'
  ].join(', ')
}
const transition = {
  immediately: '0ms',
  fast: '200ms',
  normal: '300ms',
  slow: '500ms'
}
const color = {
  whiteCard: 'hsl(0deg 0% 100%)',
  defaultBackgroundGray: '#666',
  grayText: 'hsla(0deg 0% 20% / 70%)',
  darkText: 'hsl(213deg 6% 32%)' // 带有一点蓝
}
const font = {
  small: '9px',
  simi: '14px',
  medium: '16px',
  large: '19.2px'
}
const size = {
  mini: '2px',
  large: '8px'
}

const cssTheme = { shadow, transition, color, font, size }
export default cssTheme
