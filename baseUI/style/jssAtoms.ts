import jssAtomGenerator from './jssAtomGenerator'

/**
 * @namespace JSSAtoms
 * mostly it's tailwind style
 */
const JSSAtoms = jssAtomGenerator({
  properties: {
    /**
     * @see tilwindCSS https://tailwindcss.com/docs/background-size
     * @see MDN https://developer.mozilla.org/en-US/docs/Web/CSS/background-size#syntax
     */
    backgroundSize: {
      keywords: [
        ['bg_auto', 'auto'],
        ['bg_cover', 'cover'],
        ['bg_contain', 'contain']
      ]
    },

    /**
     * @see tilwindCSS https://tailwindcss.com/docs/background-origin
     * @see MDN https://developer.mozilla.org/en-US/docs/Web/CSS/background-origin#syntax
     */
    backgroundOrigin: {
      keywords: [
        ['bg_origin_border', 'border-box'],
        ['bg_origin_padding', 'padding-box'],
        ['bg_origin_content', 'content-box']
      ]
    },

    /**
     * @see tilwindCSS https://tailwindcss.com/docs/background-repeat
     * @see MDN https://developer.mozilla.org/en-US/docs/Web/CSS/background-repeat#syntax
     */
    backgroundRepeat: {
      keywords: [
        ['bg_repeat', 'repeat'],
        ['bg_no_repeat', 'no-repeat'],
        ['bg_repeat_x', 'repeat-x'],
        ['bg_repeat_y', 'repeat-y'],
        ['bg_repeat_round', 'round'],
        ['bg_repeat_space', 'space']
      ]
    },

    /**
     * @see tilwindCSS https://tailwindcss.com/docs/background-clip
     * @see MDN https://developer.mozilla.org/en-US/docs/Web/CSS/background-clip#syntax
     */
    backgroundClip: {
      keywords: [
        ['bg_clip_border', 'border-box'],
        ['bg_clip_padding', 'padding-box'],
        ['bg_clip_content', 'content-box'],
        ['bg_clip_text', 'text']
      ]
    },

    /**
     * @see tilwindCSS https://tailwindcss.com/docs/background-position
     * @see MDN https://developer.mozilla.org/en-US/docs/Web/CSS/background-position#syntax
     */
    backgroundPosition: {
      keywords: [
        ['bg_top', 'top'],
        ['bg_bottom', 'bottom'],
        ['bg_left', 'left'],
        ['bg_right', 'right'],
        ['bg_center', 'center'],
        ['bg_top_left', 'top left'],
        ['bg_top_right', 'top right']
      ]
    }
  }
} as const)
export default JSSAtoms

// console.log('JSSAtoms: ', JSSAtoms.bg_origin_border)
