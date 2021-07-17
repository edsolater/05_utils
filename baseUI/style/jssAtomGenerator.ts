import { CSSProperties } from 'react'
import { ExtractProperty, SKeyof, SnakeCase } from 'typings/tools'
import { objectFlatMapEntry } from '../../utils/functions/object/objectMap'
import { overwriteFunctionName } from '../../utils/functions/functionFactory'
import { toSnakeCase } from '../../utils/functions/string/changeCase'
import { toPxIfNumber } from './cssUnits'

type AtomCSSRule = {
  [csskey: string]: any
}

type AtomRule = [jssKeywordName: string, cssRule: AtomCSSRule]

type Keyword = readonly [jskeyword: string, cssValue: string]
type Variant = string

type PropertyOption = {
  [P in keyof CSSProperties]: {
    keywords: readonly Keyword[]
  }
}
type VariantOption = readonly Variant[]

type GetJSSAtomFromOptions<P extends PropertyOption, V extends VariantOption> =
  /* main css func */
  {
    [JSSPropertyName in SKeyof<P>]: (
      ...cssInputs: (string | number)[]
    ) => {
      [K in JSSPropertyName]: string
    }
  } &
    /* shortcut css rule */
    {
      [JSSPropertyName in SKeyof<P> as `${ExtractProperty<
        P[JSSPropertyName],
        'keywords'
      >[number][0]}`]: {
        [K in JSSPropertyName]: string
      }
    } &
    {
      /* variant added css rule */
      [JSSPropertyName in SKeyof<P> as `${V[number]}:${ExtractProperty<
        P[JSSPropertyName],
        'keywords'
      >[number][0]}`]: {
        [K in `:hover`]: { [P in JSSPropertyName]: string }
      }
    }

/**
 * how to use the function ? Please see {@link JSSAtoms}
 */
export default function jssAtomGenerator<P extends PropertyOption, V extends VariantOption>({
  properties,
  variants
}: {
  properties: P
  variants: V
}): GetJSSAtomFromOptions<P, V> {
  return objectFlatMapEntry(properties, ([propertyName, { keywords = [] } = {}]) =>
    addVariant(variants, [
      [propertyName, getMainFunction(propertyName)],
      ...getShortcutFunctions(propertyName, keywords)
    ])
  )
}

function getMainFunction(cssPropertyName: string): (...params: any[]) => AtomCSSRule {
  return overwriteFunctionName(
    (...params) => ({ [cssPropertyName]: params.map(toPxIfNumber).join(' ') } as AtomCSSRule),
    cssPropertyName
  )
}

function getShortcutFunctions(cssPropertyName: string, keywords: readonly Keyword[]): AtomRule[] {
  return keywords.map(([keywordName, cssValue]) => [keywordName, { [cssPropertyName]: cssValue }])
}

function addVariant(variants: readonly Variant[], originAtomRules: readonly AtomRule[]) {
  const variantedAtomRules = originAtomRules.flatMap(([key, cssRule]) =>
    variants.map((variant) => [`${variant}:${key}`, { [`:${variant}`]: cssRule }] as AtomRule)
  )
  return [...originAtomRules, ...variantedAtomRules]
}
