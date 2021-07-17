import { CSSProperties } from 'react'
import { ExtractProperty, SKeyof, SnakeCase } from 'typings/tools'
import { objectFlatMapEntry } from '../../utils/functions/object/objectMap'
import { overwriteFunctionName } from '../../utils/functions/functionFactory'
import { toSnakeCase } from '../../utils/functions/string/changeCase'
import { toPxIfNumber } from './cssUnits'

type Keyword = readonly [jskeyword: string, cssValue: string]
type PropertyOption = {
  [P in keyof CSSProperties]: {
    keywordPrefix?: string
    keywords: readonly Keyword[]
  }
}
type GetJSSAtomFromOptions<
  PropertiesOptions extends {
    [P in keyof CSSProperties]: {
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
      [JSSPropertyName in SKeyof<PropertiesOptions> as `${SnakeCase<
        ExtractProperty<PropertiesOptions[JSSPropertyName], 'keywords'>[number][0]
      >}`]: {
        [K in JSSPropertyName]: string
      }
    }

/**
 * how to use the function ? Please see {@link JSSAtoms}
 */
export default function jssAtomGenerator<P extends PropertyOption>({
  properties
}: {
  properties: P
}): GetJSSAtomFromOptions<P> {
  return objectFlatMapEntry(properties, ([propertyName, { keywords = [] } = {}]) => [
    [propertyName, getMainFunction(propertyName)],
    ...getShortcutFunctions(propertyName, keywords)
  ])
}

function getMainFunction(cssPropertyName: string) {
  return overwriteFunctionName(
    (...params) => ({ [cssPropertyName]: params.map(toPxIfNumber).join(' ') }),
    cssPropertyName
  )
}

function getShortcutFunctions(cssPropertyName: string, keywords: readonly Keyword[]) {
  return keywords.map(([keywordName, cssValue]) => [
    toSnakeCase(keywordName),
    { [cssPropertyName]: cssValue }
  ])
}
