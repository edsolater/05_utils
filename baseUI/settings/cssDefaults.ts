const cssDefaults = {
  color: {
    whiteCard: 'hsl(0deg 0% 100%)',
    grayText: 'hsla(0deg 0% 20% / 70%)',
    darkText: 'hsl(213deg 6% 32%)', // 带有一点蓝
    defaultBackgroundGray: '#666',
    darkMaskLighter: 'hsla(0deg 0% 0% / 8%)',
    maskBg: 'hsla(0deg 0% 0% / 0.2)'
  },
  transition: {
    immediately: '0ms',
    fast: '200ms',
    normal: '300ms',
    slow: '500ms'
  },
  shadow: {
    smooth: [
      '0px 4px 16px rgba(0, 0, 0, 0.1)',
      '0px 8px 32px rgba(0, 0, 0, 0.05)',
      '0px 16px 64px rgba(0, 0, 0, 0.025)'
    ].join(', ')
  }
} as const
export default cssDefaults
