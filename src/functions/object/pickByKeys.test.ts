import pickByKeys from './pickByKeys'

test('基础案例', () => {
  expect(pickByKeys({ a: 1, hello: 2 }, ['a'])).toEqual({ a: 1 })
})
