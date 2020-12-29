// import { maxBy } from "lodash"

// var Maybe = function (x) {
//   this.__value = x
// }

// Maybe.of = function (x) {
//   return new Maybe(x)
// }

// Maybe.prototype.isNothing = function () {
//   return this.__value === null || this.__value === undefined
// }

// Maybe.prototype.map = function (f) {
//   return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.__value))
// }
class Maybe<T> {
  __value: T
  constructor(x: T) {
    this.__value = x
  }
  static of<T>(x: T) {
    return new Maybe<T>(x)
  }
  isNothing() {
    return this.__value === null || this.__value === undefined
  }
  map<K>(f: (__value: T) => K) {
    return Maybe.of<T extends null | undefined ? null : K>(
      //@ts-ignore
      this.isNothing() ? null : f(this.__value)
    )
  }
}

Maybe.of(3)
  .map(x => x + 1)
  .map(x => x)
