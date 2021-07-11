import isObjectLike from 'utils/functions/judgers/isObjectOrArray'
import isObjectLikeOrFunction from '../functions/judgers/isObjectLikeOrFunction'

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
      return isObjectLikeOrFunction(resultValue)
        ? createActionObserver(actionOptions, resultValue, $prefixPath.concat([p]))
        : resultValue
    },
    apply(_target, _thisArg, args) {
      const resultValue = actionOptions.apply?.($prefixPath, args)
      console.log('resultValue2: ', resultValue)
      return isObjectLikeOrFunction(resultValue)
        ? createActionObserver(actionOptions, resultValue, $prefixPath)
        : resultValue
    }
  })
}
