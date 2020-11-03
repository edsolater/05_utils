import pickByPropertyNames from './pickByPropertyNames'

test('基础案例', () => {
  expect(pickByPropertyNames({ a: 1, hello: 2 }, ['a'])).toEqual({ a: 1 })
})
