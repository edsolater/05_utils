import insertProperties from './insertProperties'

test('基础案例', () => {
  expect(insertProperties({ a: 1, b: 2 }, { c: 'hello', d: 'hello' })).toEqual({
    a: 1,
    b: 2,
    c: 'hello',
    d: 'hello'
  })
  expect(insertProperties({ a: 1, b: 2 }, { c: 'hello' })).toEqual({ a: 1, b: 2, c: 'hello' })
})
