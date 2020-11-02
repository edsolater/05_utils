import objectReduce from './objectReduce'

test('基础案例', () => {
  expect(objectReduce({ a: 1, b: 2 }, (acc, [_, value]) => acc + value, 0)).toEqual(3)
})
