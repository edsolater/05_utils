import objectFilter from './objectFilter'

test('基础案例', () => {
  expect(objectFilter({ a: 1, b: 2 }, ([, value]) => value > 1)).toEqual({ b: 2 })
})
