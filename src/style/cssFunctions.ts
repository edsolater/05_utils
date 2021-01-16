export const cssCalc = (value: any) => `calc(${value})`
export const cssVar = (cssVariableName: string, fallback?: string | number) =>
  `var(--${cssVariableName}${fallback ? ', ' + fallback : ''})`
