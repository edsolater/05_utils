import isObjectLike from './isObjectOrArray'
import canSatisfyAll from './canSatisfyAll'

test('基础案例', () => {
  expect(canSatisfyAll({}, isObjectLike)).toBe(true)
})
