import jssAtomGenerator from './jssAtomGenerator'

/**
 * @namespace JSSAtoms
 * mostly it's tailwind style
 * @example
 * JSSAtoms['bg-bottom'] //=> {backgroundPosition: "bottom"}
 * JSSAtoms['hover:bg-bottom'] //=> {"&:hover": {backgroundPosition: "bottom"}}
 * JSSAtoms('hover')['bg-bottom'] //=> {"&:hover": {backgroundPosition: "bottom"}}
 *
 * JSSAtoms['background-position']('top 1px')) //=> {backgroundPostion: "top 1px"}
 * JSSAtoms['hover:background-position']('top 1px')) //=> {"&:hover": {backgroundPostion: "top 1px"}}
 * JSSAtoms('hover')['background-position']('top 1px')) //=> {"&:hover": {backgroundPostion: "top 1px"}}
 */
const JSSAtoms = jssAtomGenerator({
  raw: {
    'background-size': '{backgroundSize: "$0"}',
    'background-origin': '{backgroundOrigin: "$0"}',
    'background-clip': '{backgroundClip: "$0"}',
    'background-position': '{backgroundPostion: "$0"}',
    'background-repeat': '{backgroundRepeat: "$0"}',
    'palceholder-color': '{"&::placeholder": {color: "$0"}}'
  },
  keywords: {
    /** @see background-size https://tailwindcss.com/docs/background-size */
    'bg-auto': '{backgroundSize: "auto"}',
    'bg-cover': '{backgroundSize: "cover"}',
    'bg-contain': '{backgroundSize: "contain"}',

    /** @see background-origin https://tailwindcss.com/docs/background-origin */
    'bg-origin-border': '{backgroundOrigin: "border-box"}',
    'bg-origin-padding': '{backgroundOrigin: "padding-box"}',
    'bg-origin-content': '{backgroundOrigin: "content-box"}',

    /** @see background-clip https://tailwindcss.com/docs/background-clip */
    'bg-clip-border': '{backgroundClip: "border-box"}',
    'bg-clip-padding': '{backgroundClip: "padding-box"}',
    'bg-clip-content': '{backgroundClip: "content-box"}',
    'bg-clip-text': '{backgroundClip: "text"}',

    /** @see background-position https://tailwindcss.com/docs/background-position */
    'bg-top': '{backgroundPosition: "top"}',
    'bg-bottom': '{backgroundPosition: "bottom"}',
    'bg-left': '{backgroundPosition: "left"}',
    'bg-right': '{backgroundPosition: "right"}',
    'bg-center': '{backgroundPosition: "center"}',
    'bg-top-left': '{backgroundPosition: "top left"}',
    'bg-top-right': '{backgroundPosition: "top right"}',

    /** @see background-repeat https://tailwindcss.com/docs/background-repeat */
    'bg-repeat': '{backgroundRepeat: "repeat"}',
    'bg-no-repeat': '{backgroundRepeat: "no-repeat"}',
    'bg-repeat-x': '{backgroundRepeat: "repeat-x"}',
    'bg-repeat-y': '{backgroundRepeat: "repeat-y"}',
    'bg-repeat-round': '{backgroundRepeat: "round"}',
    'bg-repeat-space': '{backgroundRepeat: "space"}',

    /** @see placeholder-color https://tailwindcss.com/docs/placeholder-color */
    'placeholder-transparent': '{"&::placeholder": {color: "transparent"}}',
    'placeholder-current': '{"&::placeholder": {color: "currentColor"}}'
  },
  pseudoClass: ['hover', 'active', 'empty', 'first-child', 'last-child']
} as const)
export default JSSAtoms

export const HoverAtoms = JSSAtoms('hover')
export const ActiveAtoms = JSSAtoms('active')

console.log('ActiveAtoms: ', ActiveAtoms['bg-bottom'])
console.log('ActiveAtoms: ', ActiveAtoms['background-position']('top'))


console.log('JSSAtoms: ', JSSAtoms['bg-bottom'])
console.log('JSSAtoms: ', JSSAtoms['hover:bg-bottom'])
console.log('JSSAtoms: ', JSSAtoms('hover')['bg-bottom'])

console.log('JSSAtoms: ', JSSAtoms['background-position']('top 1px'))
console.log('JSSAtoms: ', JSSAtoms['hover:background-position']('top 1px'))
console.log('JSSAtoms: ', JSSAtoms('hover')['background-position']('top 1px'))
