import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRoute } from './route/app_route';

function App() {
  return (
    <Router>
      <AppRoute />
    </Router>
  );
}

export default App;
