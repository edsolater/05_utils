import cssColor from 'baseUI/style/cssColor'
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
  },
  Button: {
    'padding--small': `${cssTheme.size.mini} ${cssTheme.size.large}`,
    'fontSize--small': cssTheme.font.medium,
    'borderRadius--small': cssTheme.size.mini,

    'padding--medium': `${cssTheme.size.mini} ${cssTheme.size.large}`,
    'fontSize--medium': cssTheme.font.medium,
    'borderRadius--medium': cssTheme.size.mini,

    'padding--large': `${cssTheme.size.mini} ${cssTheme.size.large}`,
    'fontSize--large': cssTheme.font.medium,
    'borderRadius--large': cssTheme.size.mini,

    'textColor--fill': cssColor.white,
    'background--fill': cssTheme.color.defaultBackgroundGray,
    'borderWidth--outline': '1px',
    'borderColor--outline': 'currentcolor',
    'borderOpacity--outline': '0.3'
  },
  Caption: {
    textColor: cssTheme.color.grayText
  },
  Icon: {
    'size--medium': '24px',
    'size--large': '36px'
  }
}

export default uiCSS
