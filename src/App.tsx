import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home';
import OauthPage from './pages/ouath';
import RegisterPage from "./pages/ouath/register/RegisterPage";
import LoginPage from './pages/ouath/login/LoginPage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* oauth page with nested routes */}
          <Route path='/oauth' element={<OauthPage />}>
            <Route path='register' element={<RegisterPage />} />
            <Route path='login' element={<LoginPage />} />
          </Route>

          

        </Routes>
      </Router>
    </>
  )
}

export default App;