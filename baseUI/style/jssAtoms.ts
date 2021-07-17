import jssAtomGenerator from './jssAtomGenerator'

/**
 * @namespace JSSAtoms
 */
const JSSAtoms = jssAtomGenerator({
  properties: {
    backgroundSize: { keywords: ['cover', 'contain'] },
    backgroundOrigin: { keywords: ['border-box', 'padding-box', 'content-box'] },
    backgroundRepeat: {
      keywords: ['repeat-x', 'repeat-y', 'repeat', 'space', 'round', 'no-repeat']
    },
    backgroundPosition: {
      keywordPrefix:'bg', // so you can just call bg_top() bg_top_left()
      keywords: [
        'top',
        'bottom',
        'left',
        'right',
        'center',
        // ['top-left', ['top', 'left']],
        // ['top-right', ['top', 'right']]
      ]
    }
  }
} as const)
export default JSSAtoms

console.log(JSSAtoms)