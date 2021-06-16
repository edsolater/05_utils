import { CSSPropertyValue } from 'baseUI/style'
import merge from 'utils/functions/object/merge'
export const cssDefaultColor = {
  whiteCard: 'hsl(0deg 0% 100%)',
  grayText: 'hsl(0deg 0% 20% / 70%)',
  darkText: 'hsl(213deg 6% 32%)', // 带有一点蓝
  defaultBackgroundGray: '#666',
  darkMaskLighter: 'hsl(0deg 0% 0% / 8%)',
  maskBg: 'hsla(0deg 0% 0% / 0.2)'
} as const

const componentDefault = {
  color: {
    whiteCard: 'hsl(0deg 0% 100%)',
    grayText: 'hsla(0deg 0% 20% / 70%)',
    darkText: 'hsl(213deg 6% 32%)', // 带有一点蓝
    defaultBackgroundGray: '#666',
    darkMaskLighter: 'hsla(0deg 0% 0% / 8%)',
    maskBg: 'hsla(0deg 0% 0% / 0.2)'
  },
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
  scrollbar: {
    thumbColor: 'hsla(0deg 0% 0% / 0.2)',
    thumbColorHover: 'hsla(0deg 0% 0% / 0.3)',
    thumbColorActive: 'hsla(0deg 0% 0% / 0.5)'
    // exclusive color for dark mode
    // thumbColor_darkMode:
  },
  Card: {
    'borderRadius--small': '4px',
    'borderRadius--medium': '8px',
    'borderRadius--large': '32px'
  }
} as const

export const {
  // color: cssDefaultColor,
  transiton: cssDefaultTransition,
  shadow: cssDefaultShadow,
  scrollbar: cssDefaultScrollbar
} = componentDefault

const cssDefaults = merge(componentDefault, cssDefaultColor)
// TODO: 要有个 <CSSTheme> 组件，跟 <AppSetting> 作用相似。不过是设置cssDefault的。

export default cssDefaults // TODO 要想办法把这个cssDefaultColor给去除
