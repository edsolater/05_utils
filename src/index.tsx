import React from 'react'
// @ts-expect-error
// import {unstable_createRoot as createRoot} from 'react-dom'
import { render } from 'react-dom'
import './style/initial.css'
import TestGrounds from 'pages/TestEggs'
import Home from 'pages/Home'
import AllExamples from 'pages/AllExamples'
import { setLotCss } from 'style/setCSS'
import { rootVariables } from './style/cssVaraiable'
setLotCss(document.documentElement, Object.entries(rootVariables))
function App() {
  return (
    // <TestGrounds /> // 测试田
    // <Home /> // 视频通话
    <AllExamples />
  )
}
// createRoot(document.getElementById('app')).render(<App />)
render(<App />, document.getElementById('app'))
