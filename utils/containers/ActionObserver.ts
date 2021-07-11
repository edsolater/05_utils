import isFunction from 'utils/functions/judgers/isFunction'
import isObjectLike from 'utils/functions/judgers/isObjectOrArray'

type Value = any

interface ActionOptions {
  get?(propertyPath: string[]): Value
  apply?(propertyPath: string[], args: any[]): Value
}

/**
 * map all action to another object
 * @param callback use it to get fetch real value
 * @param $target (forcely assign by this function itself)
 * @param $prefixPath (forcely assign by this function itself)
 * @returns
 */
export function createActionObserver(
  actionOptions: ActionOptions,
  $target: object = {},
  $prefixPath: string[] = []
) {
  return new Proxy($target, {
    get(_target, p: string) {
      const resultValue = actionOptions.get?.($prefixPath.concat([p]))
      console.log('resultValue1: ', resultValue)
      if (isObjectLike(resultValue) || isFunction(resultValue)) {
        return createActionObserver(actionOptions, resultValue, $prefixPath.concat([p]))
      }
      return resultValue
    },
    apply(_target, _thisArg, args) {
      const resultValue = actionOptions.apply?.($prefixPath, args)
      console.log('resultValue2: ', resultValue)
      if (isObjectLike(resultValue) || isFunction(resultValue)) {
        return createActionObserver(actionOptions, resultValue, $prefixPath)
      }
      return resultValue
    }
  })
}
