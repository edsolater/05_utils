import objectFilter from './objectFilter'

test('基础案例', () => {
  expect(objectFilter({ a: 1, b: 2, c: 3, d: 4 }, ([, value]) => value > 1)).toEqual({
    b: 2,
    c: 3,
    d: 4
  })
  expect(objectFilter({ a: 1, b: 2, c: 3, d: 4 }, ([, value]) => value > 2)).toEqual({
    c: 3,
    d: 4
  })
  expect(objectFilter({ a: 1, b: 2, c: 3, d: 4 }, ([, value]) => value > 3)).toEqual({
    d: 4
  })
})
