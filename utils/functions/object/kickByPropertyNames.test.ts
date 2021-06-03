import kickByPropertyNames from './kickByPropertyNames'

test('基础案例', () => {
  const result = kickByPropertyNames({ a: 1, b: 2 }, ['a'])
  expect(result).toEqual({ b: 2 })
})
