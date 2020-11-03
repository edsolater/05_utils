import kickByPropertyNames from './kickByPropertyNames'

test('基础案例', () => {
  expect(kickByPropertyNames({ a: 1, b: 2 }, ['a'])).toEqual({ b: 2 })
})
