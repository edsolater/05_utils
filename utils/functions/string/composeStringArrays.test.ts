import composeStringArrays from './composeStringArrays'

test('基础案例', () => {
  expect(composeStringArrays('%1: %2', ['hello', 'hi'], ['Bill', 'Simon'])).toEqual([
    'hello: Bill',
    'hi: Bill',
    'hello: Simon',
    'hi: Simon'
  ])
})
