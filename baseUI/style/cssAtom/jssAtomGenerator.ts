import { CSSProperties } from 'react'
import { PascalCase } from 'typings/tools'
import { objectFlatMapEntry } from '../../../utils/functions/object/objectMap'
import { overwriteFunctionName } from '../../../utils/functions/functionFactory'
import { toCamelCase, toPascalCase } from '../../../utils/functions/string/changeCase'
import { toPxIfNumber } from '../cssUnits'

const globalKeywords = ['inherit', 'initial', 'revert', 'unset'] as const

type ExtractKeywordFromPropertyOption<P> = P extends { keywords: readonly (infer K)[] }
  ? K extends string
    ? K
    : string
  : string
/**
 * how to use the function ? Please see {@link JSSAtoms}
 */
export function jssAtomGenerator<
  Keyword extends string,
  PropertiesOptions extends { [P in keyof CSSProperties]: { keywords: readonly Keyword[] } }
>({
  properties
}: {
  properties: PropertiesOptions
}): {
  [JSSPropertyName in Extract<keyof PropertiesOptions, string> as `${JSSPropertyName}${
    | PascalCase<ExtractKeywordFromPropertyOption<PropertiesOptions[JSSPropertyName]>>
    | ''}`]: any
} {
  return objectFlatMapEntry(properties, ([propertyName, { keywords }]) => {
    const mainFunction = overwriteFunctionName(
      (...params) => ({ [toCamelCase(propertyName)]: params.map(toPxIfNumber).join(' ') }),
      toCamelCase(propertyName)
    )
    const shortcutFunctions = [...keywords, ...globalKeywords].map((keyword) => {
      const shortcurFunction = overwriteFunctionName(
        () => mainFunction(keyword),
        `${toCamelCase(propertyName)}${toPascalCase(keyword)}`
      )
      return [shortcurFunction.name, shortcurFunction]
    })

    return [[propertyName, mainFunction], ...shortcutFunctions]
  })
}
