import composeMultiString from './composeMultiString'

test('基础案例', () => {
  expect(composeMultiString('%1: %2', ['hello', 'hi'], ['Bill', 'Simon'])).toEqual([
    'hello: Bill',
    'hello: Simon',
    'hi: Bill',
    'hi: Simon'
  ])
})
