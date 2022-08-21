import { Route, Routes } from 'react-router-dom';
import TabularML from './pages/TabularML';
import Home from './pages/Home';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ml" element={<TabularML />} />
      </Routes>
    </div>
  );
}
