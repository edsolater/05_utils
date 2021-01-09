import omitByKeys from './omitByKeys'

test('基础案例', () => {
  expect(omitByKeys({ a: 1, b: 3 }, 'a')).toEqual({ b: 3 })
})
