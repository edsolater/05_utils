import overwriteFunctionName from 'utils/functions/functionFactory/overwriteFunctionName';
import { toCamelCase, toPascalCase } from 'utils/functions/string/changeCase';
import { toPxIfNumber } from '../cssUnits';

export function jssAtomFunctionFactory<CSSPropertyName extends string, Keyword extends string>({
  cssPropertyName, allowKeywords = []
}: {
  cssPropertyName: CSSPropertyName;
  allowKeywords?: Keyword[];
}) {
  const mainFunction = overwriteFunctionName(
    (...params) => ({ [toCamelCase(cssPropertyName)]: params.map(toPxIfNumber).join(' ') }),
    toCamelCase(cssPropertyName)
  );

  const globalKeywords = ['inherit', 'initial', 'revert', 'unset'] as const;
  const shortcutFunction = Object.fromEntries(
    allowKeywords
      //@ts-expect-error .concat is not smart enough
      .concat(globalKeywords)
      .map((keyword) => [
        keyword,
        overwriteFunctionName(
          () => mainFunction(keyword),
          `${toCamelCase(cssPropertyName)}${toPascalCase(keyword)}`
        )
      ])
  ) as {
      [K in typeof globalKeywords[number] | Keyword]: () => {
        [p in CSSPropertyName]: string;
      };
    };

  return {
    mainFunction,
    shortcutFunction
  };
}
