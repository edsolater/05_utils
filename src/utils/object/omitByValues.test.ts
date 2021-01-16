import omitByValues from './omitByValues'

test('基础案例', () => {
  expect(omitByValues({ a: 1, b: 3 }, 1)).toEqual({ b: 3 })
})
