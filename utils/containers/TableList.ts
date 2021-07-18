// abstract class ArrayBase<T> implements Array<T> {
//   #innerArr: T[]
//   constructor(abstractOption: {
//     init?: T[]
//     proxyHandler?: { set?(prop, value): any; get?(prop): any }
//   }) {
//     this.#innerArr = new Proxy(abstractOption.init ?? [], abstractOption.proxyHandler??{})
//   }
//   get length() {
//     return this.#innerArr.length
//   }
//   push(item) {
//     return this.#innerArr.push(item)
//   }
// }
class TableList<T> implements Array<T> {
  raw: T[]
  // #indexList1: {
  //   keyName: keyof T
  //   list: Map<T[keyof T], T>
  // }
  constructor(init: T[], option?: { key: (keyof T)[] }) {
    
  }

  // establishIndex()
}
const foo = new TableList([
  { key: 2, name: 'sdf' },
  { key: 5, name: 'hello' }
])
foo.push({ key: 2, name: 'sdf' })
const a = [...foo]
console.log('foo.getArr: ', a)
