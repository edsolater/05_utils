import { jssAtomGenerator } from './jssAtomGenerator'

/**
 * @namespace JSSAtoms
 */
const JSSAtoms = jssAtomGenerator({
  properties: {
    backgroundSize: { keywords: ['cover', 'contain'] },
    backgroundOrigin: { keywords: ['border-box', 'padding-box', 'content-box'] }
  }
} as const)
export default JSSAtoms


