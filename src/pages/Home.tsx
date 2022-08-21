import { Link } from 'react-router-dom';
import '../App.css';

export default function Home() {
  return (
    <div className="App">
      <h1>Machine Learning</h1>
      <Link to="/ml">
        <button style={{ backgroundColor: '#6dffad' }}>Start</button>
      </Link>
    </div>
  );
}
