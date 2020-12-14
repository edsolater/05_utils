import cleanObject from './cleanObject'

test('基础案例', () => {
  expect(cleanObject({ a: 1, b: 'hello', c: undefined })).toEqual({ a: 1, b: 'hello' })
})
