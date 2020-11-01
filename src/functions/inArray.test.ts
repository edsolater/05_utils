import inArray from './inArray'

test('基础案例', () => {
  expect(inArray(2, [1, 2, 3])).toEqual(true)
  expect(inArray('hello', ['hello', 'world'])).toEqual(true)
})
