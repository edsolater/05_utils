import objectMap from './objectMap'

test('基础案例', () => {
  expect(objectMap({ a: 1, b: 2 }, ([key, value]) => [key, value * 2])).toEqual({ a: 2, b: 4 })
})
