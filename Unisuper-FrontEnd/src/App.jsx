

import './App.css'
import { Outlet } from 'react-router-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'




function App() {
  return (
    <>
      <Outlet></Outlet>
    </>
  )
}

export default App
