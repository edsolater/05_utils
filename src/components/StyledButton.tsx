/** @jsx jsx */
import { jsx, Interpolation, keyframes } from '@emotion/core'
import { IFC } from 'typings/reactType'
import Div from 'baseUI/Div'

const KeyframeRadarWave = keyframes`
  from {
    opacity: 1;
    transform: scale(0.8);
  }
  to {
    opacity: 0;
    transform: scale(2);
  }
`
const cssButton: Interpolation = {
  appearance: 'none',
  border: 'none',
  width: 150,
  height: 150,
  borderRadius: '50%',
  fontSize: '1.3em',
  position: 'relative'
}
const cssPrimaryButton: Interpolation = {
  color: 'var(--primary-button-text-color, white)',
  background: 'var(--primary-bg-color, dodgerblue)'
}
const cssWave: Interpolation = {
  pointerEvents: 'none',
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  borderRadius: '50%',
  zIndex: -1,
  background: `radial-gradient(
    circle at center,
    transparent 0 50%,
    var(--primary-color) 75%,
    transparent 75%
  )`,
  animation: `${KeyframeRadarWave} 1s infinite`
}
const StyledButton: IFC<{ onClick?: (e: MouseEvent) => void }, HTMLButtonElement> = ({
  className,
  css,
  onClick,
  children
}) => {
  return (
    //@ts-expect-error interface extend 有问题
    <button css={[cssButton, cssPrimaryButton, css]} className={className} onClick={onClick}>
      {children}
      <Div className='wave1' css={cssWave}></Div>
      <Div className='wave2' css={[cssWave, { animationDelay: '.3s' }]}></Div>
    </button>
  )
}

export default StyledButton
