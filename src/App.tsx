import { Route, Routes } from 'react-router-dom';
import Train from './pages/Train';
import Home from './pages/Home';
import Full from './pages/Full';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/train" element={<Train />} />
        <Route path="/full" element={<Full />} />
      </Routes>
    </div>
  );
}
