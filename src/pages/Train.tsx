import TrainButton from '../components/trainButton/TrainButton';
import TrainTable from '../components/trainTable/TrainTable';
import './train.css';

// TO-DO use slots for columns
export default function Train() {
  return (
    <div>
      <h1>Train</h1>
      <div id="left-column" className="column">
        <div style={{ float: 'right', marginRight: '15%' }}>
          <TrainTable />
        </div>
      </div>
      <div id="right-column" className="column">
        <div style={{ float: 'left', marginLeft: '22%' }}>
          <TrainButton />
        </div>
      </div>
    </div>
  );
}
