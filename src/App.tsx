import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './pages/home'

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route index element={<HomePage/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
