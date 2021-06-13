import deepClone from './deepClone'

/**
 * 这个函数就像定点打击
 * @todo example-2 is not satisfied
 * 
 * inspire from Immer.js @see https://immerjs.github.io/immer/
 * @example
 * produce({ a: { b: 3 } }, (draft) => { draft.a.b = 4 }) //=> { a: { b: 4 }}
 * 
 * const foo = {a: {b: 3}, c: {d:5}}
 * const foo2 = produce(foo, (d)=>{d.c.d = 6})
 * foo.a === foo2.a //=> true
 */
export default function produce<T>(target: T, producer: (darft: T) => void): T {
  const object = deepClone(target)
  producer(object)
  return object
}