import isObjectLikeOrFunction from '@edsolater/fnkit/dist/judgers/isObjectLikeOrFunction'

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
export function createActionTracker(
  actionOptions: ActionOptions,
  $target: object = {},
  $prefixPath: string[] = []
) {
  return new Proxy($target, {
    get(_target, p: string) {
      const resultValue = actionOptions.get?.($prefixPath.concat([p]))
      return isObjectLikeOrFunction(resultValue)
        ? createActionTracker(actionOptions, resultValue, $prefixPath.concat([p]))
        : resultValue
    },
    apply(_target, _thisArg, args) {
      const resultValue = actionOptions.apply?.($prefixPath, args)
      return isObjectLikeOrFunction(resultValue)
        ? createActionTracker(actionOptions, resultValue, $prefixPath)
        : resultValue
    }
  })
}
