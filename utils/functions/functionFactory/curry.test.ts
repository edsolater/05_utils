import curry from './curry'

const add = (a: number, b: '1' | '2') => a + b
const curryAdd = curry(add)

test('基础案例', () => {
  expect(curryAdd(2)('1')).toBe(add(2, '1'))
  //@ts-ignore
  expect(curryAdd(2)('1', 3)).toBe(add(2, '1'))
})
