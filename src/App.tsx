import { Route, Routes } from 'react-router-dom';
import Train from './pages/Train';
import Home from './pages/Home';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ml" element={<Train />} />
      </Routes>
    </div>
  );
}
