import areLengthEqual from './areLengthEqual'

test('基础案例', () => {
  expect(areLengthEqual([1, 2], [1, 2])).toBe(true)
})
