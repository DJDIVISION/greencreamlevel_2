import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import HomePage from './pages/HomePage';
import POSPage from './pages/POSPage';
import Stock from './pages/Stock';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/dispensario" element={<POSPage/>} />
        <Route path="/stock" element={<Stock/>} />
      </Routes>
    </Router>
  );
}

export default App;
