import { SKeyof } from 'typings/tools'
import objectMapValue, { objectFlatMapEntry } from '../../utils/functions/object/objectMap'
import { toPxIfNumber } from './cssUnits'

type AtomCSSRule = string
type AtomRules = { [jssKeywordName: string]: AtomCSSRule }

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

type AddPseudoClass<O extends Options, rules extends AtomRules> = rules &
  { [K in SKeyof<rules> as `${O['pseudoClass'][number]}:${K}`]: string }

/**
 * how to use the function ? Please see {@link JSSAtoms}
 */
export default function jssAtomGenerator<O extends Options>({
  raw,
  keywords,
  pseudoClass
}: O): AddPseudoClass<O, GetJSSAtomFromOptions<O>> {
  // @ts-expect-error
  return addPseudo(pseudoClass, {
    ...objectMapValue(raw, (v) => (...params) =>
      v.replace('$0', params.map(toPxIfNumber).join(' '))
    ),
    ...keywords
  })
}

function addPseudo(presudos: Options['pseudoClass'], rules: AtomRules) {
  const variantedAtomRules = objectFlatMapEntry(rules, ([key, cssRule]) =>
    presudos.map((presudo) => [`${presudo}:${key}`, `{"&:${presudo}": ${cssRule}}`])
  )
  return { ...rules, ...variantedAtomRules }
}
