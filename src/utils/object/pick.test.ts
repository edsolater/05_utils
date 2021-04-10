import pick from './pick'

test('基础案例', () => {
  expect(pick({ a: 1, hello: 2 }, ['a'])).toEqual({ a: 1 })
})
