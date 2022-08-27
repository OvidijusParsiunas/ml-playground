import { TrainTableActionTypes } from '../state/trainTable/consts';
import StatefulTable from '../components/table/StatefulTable';
import './train.css';

// TO-DO use slots for columns
export default function Train() {
  return (
    <div>
      <h1>Train</h1>
      <div id="left-column" className="column">
        <div style={{ float: 'right', marginRight: '15%' }}>
          <StatefulTable
            initialCSVPath="data/color.csv"
            updateTableDispatchAction={TrainTableActionTypes.UPDATE_TABLE}
            updateTableCellDispatchAction={TrainTableActionTypes.UPDATE_TABLE_CELL}
          />
        </div>
      </div>
      <div id="right-column" className="column">
        <div style={{ float: 'left', marginLeft: '22%' }}>{/* <TrainButton /> */}</div>
      </div>
    </div>
  );
}
