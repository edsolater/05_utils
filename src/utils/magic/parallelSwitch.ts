import isFunction from 'utils/judgers/isFunction'

type Primitive = boolean | number | string
type RichPrimitive = Primitive | bigint | symbol
/**
 *
 * @param mayValue
 * @param params the parameters that will be passed in mayValue(if it's function)
 * @returns
 */
function valuefiy<T extends Primitive | (() => Primitive), Params extends any[]>(
  mayValue: T,
  params?: Params
): Extract<T, Primitive> {
  // @ts-ignore
  return isFunction(mayValue) ? mayValue(...params) : mayValue
}
function parallelSwitch<T extends Primitive>(
  value: any,
  chains: [is: any, returnValue: T | (() => T)][]
) {
  for (const [is, returnValue] of chains) {
    if (value === is) return valuefiy(returnValue)
  }
}
