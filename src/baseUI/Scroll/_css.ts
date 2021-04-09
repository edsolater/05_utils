import { mix, cssMixins } from 'style/cssParser'

// TODO 有个flex，还是与业务太绑定了
export const scrollRoot = (cssinfo: { hideScrollbar?: boolean } = {}) =>
  mix(cssinfo.hideScrollbar && cssMixins.noScrollbar, {
    display: 'flex',
    overflow: 'auto'
  })
