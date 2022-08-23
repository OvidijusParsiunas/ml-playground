import { Link } from 'react-router-dom';
import './home.css';

export default function Home() {
  return (
    <div id="home">
      <h1>Machine Learning</h1>
      <Link to="/full">
        <button style={{ backgroundColor: '#6dffad' }}>Start</button>
      </Link>
    </div>
  );
}
