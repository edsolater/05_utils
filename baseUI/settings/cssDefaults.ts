import merge from 'utils/functions/object/merge'
import cssColor from '../style/cssColor'
const defaultColor = {
  whiteCard: 'hsl(0deg 0% 100%)',
  grayText: 'hsl(0deg 0% 20% / 70%)',
  darkText: 'hsl(213deg 6% 32%)', // 带有一点蓝
  defaultBackgroundGray: '#666'
} as const

const componentDefault = {
  transiton: {
    immediately: '0ms',
    fast: '200ms',
    normal: '300ms',
    slow: '500ms'
  },
  shadow: {
    drawerShadow: [
      '0px 4px 16px rgba(0, 0, 0, 0.1)',
      '0px 8px 32px rgba(0, 0, 0, 0.05)',
      '0px 16px 64px rgba(0, 0, 0, 0.025)'
    ].join(', ')
  },
  maskBg: cssColor.black,
  maskOpacity: '0.2',
  scrollbar: {
    thumbColor: 'hsla(0deg 0% 0% / 0.2)',
    thumbColorHover: 'hsla(0deg 0% 0% / 0.3)',
    thumbColorActive: 'hsla(0deg 0% 0% / 0.5)'
    // exclusive color for dark mode
    // thumbColor_darkMode:
  },
  darkMaskLighter: 'hsl(0deg 0% 0% / 8%)'
} as const

const cssDefaults = merge(componentDefault, defaultColor)

export default cssDefaults
