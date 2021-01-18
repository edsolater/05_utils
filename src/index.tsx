import React from 'react'
import { render } from 'react-dom'
import './style/initial.css'
import './style/allCSSVariable.css'
import TestGrounds from 'TestEggs'
import BoomHome from 'pages/Boom'
function App() {
  return (
    <TestGrounds /> // 测试一些功能
    // <BoomHome /> // boom 视频通话
  )
}

render(<App />, document.getElementById('app'))
