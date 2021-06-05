/** @jsx jsx */
import { jsx, CSSObject, keyframes } from '@emotion/react'
import Div from 'baseUI/components/Div'
import Button, { ButtonProps } from 'baseUI/components/Button'

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
const cssButton: CSSObject = {
  border: 'none',
  width: 150,
  height: 150,
  borderRadius: '50%',
  padding: '',
  fontSize: '1.3em',
  position: 'relative'
}
const cssPrimaryButton: CSSObject = {
  color: 'var(--primary-button-text-color, white)',
  background: 'var(--primary-bg-color, dodgerblue)'
}
const cssWave: CSSObject = {
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

const StyledButton = ({ css, children, ...restProps }: ButtonProps) => {
  return (
    <Button {...restProps} css={[cssButton, cssPrimaryButton, css]}>
      {children}
      <Div className='wave1' css={cssWave}></Div>
      <Div className='wave2' css={[cssWave, { animationDelay: '.3s' }]}></Div>
    </Button>
  )
}

export default StyledButton
