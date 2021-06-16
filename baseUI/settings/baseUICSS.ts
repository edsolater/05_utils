import cssDefaults from './cssDefaults'

export const baseUICSS = {
  Drawer: {
    shadow: cssDefaults.shadow.smooth
  },
  Card: {
    'borderRadius--small': '4px',
    'borderRadius--medium': '8px',
    'borderRadius--large': '32px'
  },
  ScrollDiv: {
    // TODO: 应该放在组件中
    thumbColor: 'hsla(0deg 0% 0% / 0.2)',
    thumbColorHover: 'hsla(0deg 0% 0% / 0.3)',
    thumbColorActive: 'hsla(0deg 0% 0% / 0.5)'
    // exclusive color for dark mode
    // thumbColor_darkMode:
  }
} as const
