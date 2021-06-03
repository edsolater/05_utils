import isObjectLike from './isObjectLike'
import canSatisfyAll from './canSatisfyAll'

test('基础案例', () => {
  expect(canSatisfyAll({}, isObjectLike)).toBe(true)
})
