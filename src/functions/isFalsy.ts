import isTruthy from './isTruthy'

export default function isFalsy(val: unknown) {
  return !isTruthy(val)
}
