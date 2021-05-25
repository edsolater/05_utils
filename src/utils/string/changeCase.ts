/**
 * @param str input string
 * @example
 * _parseString('helloWorld') => ['hello', 'world']
 * _parseString('helloWorldUI') => ['hello', 'world', 'u', 'i']
 * _parseString('helloWOrld') => ['hello', 'w', 'orld']
 * _parseString('hello-world') => ['hello', 'world']
 * _parseString('hello--world') => ['hello', 'world']
 * _parseString('hello_world') => ['hello', 'world']
 * _parseString('hello__world') => ['hello', 'world']
 * _parseString('_hello$world') => ['hello', 'world']
 */
function _parseString(str: string): string[] {
  return str
    .replace(/[A-Z]/g, '-$&')
    .toLowerCase()
    .replace(/[^a-z]+/g, ' ')
    .trim()
    .split(' ')
}

/**
 * @example
 * toCamelCase('hello-world') => 'helloWorld'
 */
export function toCamelCase(str: string): string {
  return _parseString(str)
    .map((word, idx) => (idx === 0 ? word : capitalize(word)))
    .join('')
}

/**
 * @example
 * toPascalCase('hello-world') => 'HelloWorld'
 */
export function toPascalCase(str: string): string {
  return _parseString(str)
    .map((word) => capitalize(word))
    .join('')
}

/**
 * @example
 * toKebabCase('hello_World') => 'hello-world'
 */
export function toKebabCase(str: string) {
  return _parseString(str).join('-')
}

/**
 * @example
 * toSnakeCase('hello-world') => 'hello_world'
 */
export function toSnakeCase(str: string) {
  return _parseString(str).join('_')
}

/**
 * @example
 * toConstantCase('hello-world') => 'hello_world'
 */
export function toConstantCase(str: string) {
  return toUpperCase(_parseString(str).join('_'))
}

/**
 * @example
 * toLowerCase('hello-world') => 'hello-world'
 * toLowerCase('HELLO_WORLD') => 'hello_world'
 */
export function toLowerCase(str: string) {
  return str.toLowerCase()
}

/**
 * @example
 * toUpperCase('helloworld') => 'HELLOWORLD'
 * toUpperCase('hello_world') => 'HELLO_WORLD'
 */
export function toUpperCase(str: string) {
  return str.toUpperCase()
}

/**
 * @example
 * capitalize('hello') => 'Hello'
 */
export function capitalize(str: string): Capitalize<string> {
  if (!str) return ''
  return str[0].toUpperCase() + str.slice(1)
}

/**
 * @example
 * uncapitalize('Hello') => 'hello'
 */
export function uncapitalize(str: string): Capitalize<string> {
  if (!str) return ''
  return str[0].toLowerCase() + str.slice(1)
}

export default function changeCase(
  str: string,
  targetCase: 'camelCase' | 'PascalCase' | 'kebab-case' | 'snake_case' | 'CONSTANT_CASE'
): string {
  switch (targetCase) {
    case 'camelCase':
      return toCamelCase(str)
    case 'PascalCase':
      return toPascalCase(str)
    case 'kebab-case':
      return toKebabCase(str)
    case 'snake_case':
      return toSnakeCase(str)
    case 'CONSTANT_CASE':
      return toConstantCase(str)
  }
}
