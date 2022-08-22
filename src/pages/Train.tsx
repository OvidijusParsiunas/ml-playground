import TrainButton from '../components/predictButton/TrainButton';
import TrainTable from '../components/trainTable/TrainTable';
import './train.css';

// TO-DO will probably need to be a two column instead
export default function Train() {
  return (
    <div>
      <h1>Train</h1>
      <div id="left-column" className="column side-column">
        <TrainTable />
      </div>
      <div id="center-column" className="column">
        <TrainButton />
      </div>
      <div id="right-column" className="column side-column"></div>
    </div>
  );
}
