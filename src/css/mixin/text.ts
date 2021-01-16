import { Interpolation } from '@emotion/core'

export const CSSgridItemTextLabel: () => Interpolation = () => ({
  position: 'absolute',
  left: '50%',
  top: 0,
  transform: 'translateX(-50%)',
  fontSize: 34,
  color: 'gray'
})
