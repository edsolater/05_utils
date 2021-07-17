import jssAtomGenerator from './jssAtomGenerator'

/**
 * @namespace JSSAtoms
 */
const JSSAtoms = jssAtomGenerator({
  properties: {
    backgroundSize: { keywords: ['cover', 'contain'] },
    backgroundOrigin: { keywords: ['border-box', 'padding-box', 'content-box'] },
    backgroundRepeat: {
      keywordPrefix: 'bg',
      keywords: ['repeat-x', 'repeat-y', 'repeat', 'space', 'round', 'no-repeat']
    },
    backgroundPosition: {
      keywordPrefix: 'bg', // so you can just call bg_top() bg_top_left()
      keywords: [
        'top',
        'bottom',
        'left',
        'right',
        'center',
        ['top_left', ['top', 'left']],
        ['top_right', ['top', 'right']]
      ]
    }
  }
} as const)
export default JSSAtoms.backgroundPosition

console.log(JSSAtoms)
