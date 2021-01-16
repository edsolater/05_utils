import React from 'react'
import { render } from 'react-dom'
import './style/initial.css'
import './style/allCSSVariable.css'
import TestGrounds from 'TestEggs'
import BoomHome from 'pages/BoomHome'
function App() {
  return (
    // <TestGrounds /> 测试一些功能
    <BoomHome />
  )
}

render(<App />, document.getElementById('app'))
