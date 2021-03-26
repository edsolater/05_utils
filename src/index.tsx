import React from 'react'
// @ts-expect-error
import {unstable_createRoot as createRoot} from 'react-dom'
import './style/initial.css'
import './style/allCSSVariable.css'
import TestGrounds from 'TestEggs'
import Home from 'pages/Home'
import AllExamples from 'pages/AllExamples'
function App() {
  return (
    // <TestGrounds /> // 测试一些功能
    // <Home /> // 视频通话
    <AllExamples />
  )
}
createRoot(document.getElementById('app')).render(<App />)
