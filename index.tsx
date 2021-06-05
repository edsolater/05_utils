import React from 'react'
// @ts-ignore
// import { unstable_createRoot as createRoot } from 'react-dom'
import { render } from 'react-dom'
import './initial.css'
import TestGrounds from 'pages/TestEggs'
import Home from 'pages/Home'
import AllExamples from 'pages/AllExamples'
import Providers from 'baseUI/components/Providers'
import { rootVariables } from 'baseUI/style/cssVaraiable'
import { setLotCss } from 'baseUI/style/setCSS'
setLotCss(document.documentElement, Object.entries(rootVariables))
function App() {
  return (
    <Providers>
      {/* <TestGrounds /> // 测试田 
      <Home /> // 视频通话 */}
      <AllExamples />
    </Providers>
  )
}
// createRoot(document.getElementById('app')).render(<App />)
render(<App />, document.getElementById('app'))
