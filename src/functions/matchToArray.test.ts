import matchToArray from './matchToArray'

test('基础案例', () => {
  expect(matchToArray(2, [1, 2, 3])).toEqual(true)
  expect(matchToArray('hello', ['hello', 'world'])).toEqual(true)
})
