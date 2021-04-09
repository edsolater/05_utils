import Div from 'baseUI/Div'
import React, { useEffect, useState } from 'react'
import { toPer } from 'style/cssUnits'
import { cssVar, cssVarName } from 'style/cssFunctions'
import { keyframes } from '@emotion/react'
const status = ['showing', 'blinking'] as const
const colors = ['red', 'yellow', 'blue'] as const
const keyframeBlink = keyframes`
  from {}
  to {
    background:transparent
  }
`

const showTime = 3000
const blinkingTime = 2000

const TrafficLight = () => {
  const [statusIndex, setStatusIndex] = useState(0)
  const [colorIndex, setColorIndex] = useState(0)
  useEffect(() => {
    setTimeout(() => {
      setStatusIndex(1)
    }, showTime)
    const id = window.setInterval(() => {
      setColorIndex((n) => (n + 1) % colors.length)
      setStatusIndex(0)
      setTimeout(() => {
        setStatusIndex(1)
      }, showTime)
    }, showTime + blinkingTime)
    return () => {
      window.clearInterval(id)
    }
  }, [])
  return (
    <Div
      className={status[statusIndex]}
      css={{
        width: 50,
        height: 50,
        borderRadius: toPer(50),
        background: cssVar('--light-color'),
        [`&.${status[1]}`]: {
          animation: `${keyframeBlink} ${blinkingTime / 3}ms infinite`
        }
      }}
      style={{ '--light-color': colors[colorIndex] }}
    ></Div>
  )
}
export default TrafficLight
