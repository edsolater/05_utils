import removeByKeys from './removeByKeys'

test('基础案例', () => {
  expect(removeByKeys({ a: 1, b: 3 }, 'a')).toEqual({ b: 3 })
})
