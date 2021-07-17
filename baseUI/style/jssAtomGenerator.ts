import { CSSProperties } from 'react'
import { ArrayItem, ExtractProperty, PascalCase, SKeyof, SnakeCase } from 'typings/tools'
import { objectFlatMapEntry } from '../../utils/functions/object/objectMap'
import { overwriteFunctionName } from '../../utils/functions/functionFactory'
import { toCamelCase, toPascalCase } from '../../utils/functions/string/changeCase'
import { toPxIfNumber } from './cssUnits'
import { isString } from 'utils/functions/judgers'

const globalKeywords = ['inherit', 'initial', 'revert', 'unset'] as const

type Keyword = string | readonly [keyword: string, params: readonly string[]]
type GetKeywordString<K extends Keyword> = K extends string ? K : K[0]

type GetJSSAtomFromOptions<
  PropertiesOptions extends {
    [P in keyof CSSProperties]: {
      keywordPrefix?: string
      keywords: readonly Keyword[]
    }
  }
> =
  /* main css func */
  {
    [JSSPropertyName in SKeyof<PropertiesOptions>]: (
      ...cssInputs: (string | number)[]
    ) => {
      [K in JSSPropertyName]: string
    }
  } &
    /* shortcut css rule */
    {
      [JSSPropertyName in SKeyof<PropertiesOptions> as `${ExtractProperty<
        PropertiesOptions[JSSPropertyName],
        'keywordPrefix',
        JSSPropertyName
      > &
        string}_${SnakeCase<
        GetKeywordString<ArrayItem<ExtractProperty<PropertiesOptions[JSSPropertyName], 'keywords'>>>
      >}`]: {
        [K in JSSPropertyName]: string
      }
    }

/**
 * how to use the function ? Please see {@link JSSAtoms}
 */
export default function jssAtomGenerator<
  PropertiesOptions extends {
    [P in keyof CSSProperties]: { keywordPrefix?: string; keywords: readonly Keyword[] }
  }
>({ properties }: { properties: PropertiesOptions }): GetJSSAtomFromOptions<PropertiesOptions> {
  return objectFlatMapEntry(properties, ([propertyName, { keywords }]) => [
    [propertyName, getMainFunction(propertyName)],
    getShortcutFunctions(propertyName, [...keywords, ...globalKeywords]).map((fn) => [fn.name, fn])
  ])
}

function getMainFunction(cssPropertyName: string) {
  return overwriteFunctionName(
    (...params) => ({ [toCamelCase(cssPropertyName)]: params.map(toPxIfNumber).join(' ') }),
    toCamelCase(cssPropertyName)
  )
}

function getShortcutFunctions(cssPropertyName: string, keywords: Keyword[]) {
  const verboseKeywordInput = keywords.map((keyword) =>
    isString(keyword) ? [keyword, [keyword]] : keyword
  )
  return verboseKeywordInput.map(([keywordName, params]) =>
    overwriteFunctionName(
      () => ({ [toCamelCase(cssPropertyName)]: (params as string[]).map(toPxIfNumber).join(' ') }),
      `${toCamelCase(cssPropertyName)}${toPascalCase(keywordName as string)}`
    )
  )
}
