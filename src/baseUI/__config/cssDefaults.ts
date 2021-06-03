import cssColor from './cssColor'

const cssDefaults = {
  transiton: {
    immediately: '50ms',
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
    thumbColor: 'hsla(0deg 0% 0% / 0.3)'
    // exclusive color for dark mode
    // thumbColor_darkMode:
  }
} as const
export default cssDefaults
