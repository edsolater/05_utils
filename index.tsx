import React from 'react'
// @ts-ignore
// import { unstable_createRoot as createRoot } from 'react-dom'
import { render } from 'react-dom'
import './initial.css'
import AllExamples from 'pages/AllExamples'
import Providers from 'baseUI/components/Providers'
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
