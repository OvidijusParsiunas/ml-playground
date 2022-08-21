import { Link } from 'react-router-dom';
import '../App.css';

export default function ChooseLevel() {
  return (
    <div className="App">
      <h1>How experienced are you with this platform?</h1>
      <Link to="/ml">
        <button style={{ backgroundColor: '#6dffad' }}>Beginner</button>
      </Link>
      <Link to="/ml">
        <button style={{ backgroundColor: '#6dffad' }}>Expert</button>
      </Link>
    </div>
  );
}
