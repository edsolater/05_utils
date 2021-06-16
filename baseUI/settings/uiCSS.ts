import cssTheme from './cssTheme'

const uiCSS = {
  Mask: {
    bg: 'hsla(0deg 0% 0% / 0.2)'
  },
  Drawer: {
    shadow: cssTheme.shadow.smooth
  },
  Card: {
    bg: cssTheme.color.whiteCard,
    'borderRadius--small': '4px',
    'borderRadius--medium': '8px',
    'borderRadius--large': '32px'
  },
  ScrollDiv: {
    thumbColor: 'hsla(0deg 0% 0% / 0.2)',
    thumbColorHover: 'hsla(0deg 0% 0% / 0.3)',
    thumbColorActive: 'hsla(0deg 0% 0% / 0.5)'
    // exclusive color for dark mode
    // thumbColor_darkMode:
  }
}

export default uiCSS
