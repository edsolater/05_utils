import { CSSProperties } from 'react'
import { ArrayItem, ExtractProperty, PascalCase } from 'typings/tools'
import { objectFlatMapEntry } from '../../utils/functions/object/objectMap'
import { overwriteFunctionName } from '../../utils/functions/functionFactory'
import { toCamelCase, toPascalCase } from '../../utils/functions/string/changeCase'
import { toPxIfNumber } from './cssUnits'
import { isString } from 'utils/functions/judgers'

const globalKeywords = ['inherit', 'initial', 'revert', 'unset'] as const

type Keyword = string | readonly [keyword: string, params: readonly string[]]

/**
 * how to use the function ? Please see {@link JSSAtoms}
 */
export default function jssAtomGenerator<
  PropertiesOptions extends { [P in keyof CSSProperties]: { keywords: readonly Keyword[] } }
>({
  properties
}: {
  properties: PropertiesOptions
}): {
  [JSSPropertyName in Extract<keyof PropertiesOptions, string> as `${JSSPropertyName}${
    | PascalCase<ArrayItem<ExtractProperty<PropertiesOptions[JSSPropertyName], 'keywords'>>>
    | ''}`]: any
} {
  return objectFlatMapEntry(properties, ([propertyName, { keywords }]) => {
    return [
      [propertyName, getMainFunction(propertyName)],
      getShortcutFunctions(propertyName, [...keywords, ...globalKeywords]).map((fn) => [
        fn.name,
        fn
      ])
    ]
  })
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
