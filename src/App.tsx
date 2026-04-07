import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRoute } from './route/app_route';
import { VersoToaster } from './components/common/VersoToaster';

function App() {
  return (
    <Router>
      <AppRoute />
      <VersoToaster />
    </Router>
  );
}

export default App;
