import Div from 'baseUI/component/Div'
import React, { useEffect, useState } from 'react'
import { toPer } from 'baseUI/style/cssUnits'
import { cssVar } from 'baseUI/style/cssFunctions'
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
        '--light-color': colors[colorIndex],
        width: 50,
        height: 50,
        borderRadius: toPer(50),
        background: cssVar('--light-color'),
        [`&.${status[1]}`]: {
          animation: `${keyframeBlink} ${blinkingTime / 3}ms infinite`
        }
      }}
    ></Div>
  )
}
export default TrafficLight