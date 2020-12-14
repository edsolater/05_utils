import removeByValues from './removeByValues'

test('基础案例', () => {
  expect(removeByValues({ a: 1, b: 3 }, 1)).toEqual({ b: 3 })
})
