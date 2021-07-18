import { SKeyof } from 'typings/tools'
import { isFunction, isString } from '../../utils/functions/judgers'
import objectMapValue, { objectFlatMapEntry } from '../../utils/functions/object/objectMap'
import { toPxIfNumber } from './cssUnits'

type AtomCSSRule = string // JSONString
type AtomRules = { [jssKeywordName: string]: AtomCSSRule | ((...params: any[]) => AtomCSSRule) }

type Options = {
  raw: Record<string, string>
  keywords: Record<string, string>
  pseudoClass: readonly string[]
}
type GetJSSAtomFromOptions<O extends Options> = {
  /* main css func */
  [JSSAtomKey in SKeyof<O['raw']>]: (...cssInputs: (string | number)[]) => O['raw'][JSSAtomKey]
} &
  {
    /* shortcut css rule */
    [JSSAtomKey in SKeyof<O['keywords']>]: O['keywords'][JSSAtomKey]
  }

type AddPseudoClass<O extends Options, Rules extends AtomRules> = Rules &
  /* currently only support hover , or it will be too verbose */
  { [K in SKeyof<Rules> as `hover:${K}`]: Rules[K] /* No need too details */ }

/**
 * how to use the function ? Please see {@link JSSAtoms}
 */
export default function jssAtomGenerator<O extends Options>({
  raw,
  keywords,
  pseudoClass
}: O): { (pseudo: O['pseudoClass'][number]): GetJSSAtomFromOptions<O> } & AddPseudoClass<
  O,
  GetJSSAtomFromOptions<O>
> {
  const baseRules = {
    ...objectMapValue(raw, (v) => (...params) =>
      v.replace('$0', params.map(toPxIfNumber).join(' '))
    ),
    ...keywords
  }

  const pseudoedRules = addPseudo(pseudoClass, baseRules)

  const attacher = (pseudo: O['pseudoClass'][number]) =>
    new Proxy(baseRules, {
      get(target, prop) {
        const rule = Reflect.get(target, prop)
        if (isString(rule)) return `{"&:${pseudo}": ${rule}}`
        if (isFunction(rule)) return (...params) => `{"&:${pseudo}": ${rule(...params)}}`
      }
    })

  Object.assign(attacher, pseudoedRules, baseRules)
  return attacher as any
}

function addPseudo(presudos: Options['pseudoClass'], rules: AtomRules) {
  return objectFlatMapEntry(rules, ([key, rule]) =>
    presudos.map((pseudo) => {
      if (isString(rule)) return [`${pseudo}:${key}`, `{"&:${pseudo}": ${rule}}`]
      if (isFunction(rule))
        return [`${pseudo}:${key}`, (...params) => `{"&:${pseudo}": ${rule(...params)}}`]
    })
  )
}
