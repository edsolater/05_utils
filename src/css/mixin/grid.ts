import { Interpolation } from '@emotion/core';

export const CSStestGridContainer: Interpolation = {
  display: 'grid',
  gridTemplate: '1fr 1fr / 1fr 1fr',
  gap: 8,
  overflow: 'hidden',
  background: 'lightgray',
  height: '100vh'
};
export const CSStestGridItem: Interpolation = {
  background: 'white',
  position: 'relative',
  overflow: 'hidden'
}