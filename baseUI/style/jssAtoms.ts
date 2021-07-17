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
        ['bg-auto', 'auto'],
        ['bg-cover', 'cover'],
        ['bg-contain', 'contain']
      ]
    },

    /**
     * @see tilwindCSS https://tailwindcss.com/docs/background-origin
     * @see MDN https://developer.mozilla.org/en-US/docs/Web/CSS/background-origin#syntax
     */
    backgroundOrigin: {
      keywords: [
        ['bg-origin-border', 'border-box'],
        ['bg-origin-padding', 'padding-box'],
        ['bg-origin-content', 'content-box']
      ]
    },

    /**
     * @see tilwindCSS https://tailwindcss.com/docs/background-repeat
     * @see MDN https://developer.mozilla.org/en-US/docs/Web/CSS/background-repeat#syntax
     */
    backgroundRepeat: {
      keywords: [
        ['bg-repeat', 'repeat'],
        ['bg-no-repeat', 'no-repeat'],
        ['bg-repeat-x', 'repeat-x'],
        ['bg-repeat-y', 'repeat-y'],
        ['bg-repeat-round', 'round'],
        ['bg-repeat-space', 'space']
      ]
    },

    /**
     * @see tilwindCSS https://tailwindcss.com/docs/background-clip
     * @see MDN https://developer.mozilla.org/en-US/docs/Web/CSS/background-clip#syntax
     */
    backgroundClip: {
      keywords: [
        ['bg-clip-border', 'border-box'],
        ['bg-clip-padding', 'padding-box'],
        ['bg-clip-content', 'content-box'],
        ['bg-clip-text', 'text']
      ]
    },

    /**
     * @see tilwindCSS https://tailwindcss.com/docs/background-position
     * @see MDN https://developer.mozilla.org/en-US/docs/Web/CSS/background-position#syntax
     */
    backgroundPosition: {
      keywords: [
        ['bg-top', 'top'],
        ['bg-bottom', 'bottom'],
        ['bg-left', 'left'],
        ['bg-right', 'right'],
        ['bg-center', 'center'],
        ['bg-top-left', 'top left'],
        ['bg-top-right', 'top right']
      ]
    }
  }
} as const)
export default JSSAtoms

console.log('JSSAtoms: ', JSSAtoms.bg_origin_border)
