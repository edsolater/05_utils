import bindTail from './bindTail'

const add = (a: string, b: number, c: number, d?: number) => a + b + c
const foo = bindTail(add, 3, 3, 4)

test('基础案例', () => {
  expect(foo('2')).toBe(add('2', 3, 3, 4))
})
