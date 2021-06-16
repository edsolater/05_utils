import { mixCSSObjects } from '../../../baseUI/style/cssParser'
import cssMixins from "../../../baseUI/style/cssMixins"

// TODO 有个flex，还是与业务太绑定了
export const scrollRoot = (cssinfo: { hideScrollbar?: boolean } = {}) =>
  mixCSSObjects(cssinfo.hideScrollbar && cssMixins.noScrollbar, {
    display: 'flex',
    overflow: 'auto'
  })
