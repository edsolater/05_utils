import discardArrayUndefined from './discardArrayUndefined'

test('基础案例', () => {
  expect(discardArrayUndefined([42, 21, undefined, 50, 40, undefined, 9])).toEqual([42, 21, 50, 40, 9])
})
