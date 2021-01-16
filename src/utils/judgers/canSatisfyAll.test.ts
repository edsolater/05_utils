import isObject from './isObject'
import canSatisfyAll from './canSatisfyAll'

test('基础案例', () => {
  expect(canSatisfyAll({}, isObject)).toBe(true)
})
