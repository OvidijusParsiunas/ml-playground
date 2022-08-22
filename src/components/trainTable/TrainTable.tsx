import { CSVDataReader } from '../../shared/functionality/CSVDataReader';
import { updateTrainTable } from '../../state/trainTable/actions';
import { useDispatch, useSelector } from 'react-redux';
import { RootReducer } from '../../state/rootReducer';
import { CSVData } from '../../shared/types/CSVData';
import Table from '../table/Table';
import { useEffect } from 'react';

// https://codesandbox.io/s/editable-react-table-gchwp?fontsize=14&hidenavigation=1&theme=dark&file=/src/App.js
// https://react-data-table-component.netlify.app/?path=/docs/getting-started-patterns--page
// https://github.com/revolist/revogrid
export default function TrainTable() {
  const trainingDataPath = 'data/color.csv';

  const dispatch = useDispatch();
  const trainTable = useSelector<RootReducer, RootReducer['trainTable']>((state) => state.trainTable);

  const populateTable = (CSVData: CSVData): void => {
    const tableData = { header: CSVData[0], data: CSVData.slice(1) };
    dispatch(updateTrainTable(tableData));
  };

  const fetchAndProcessTrainCSV = (numberOfAttempts = 0): void => {
    if (numberOfAttempts > 3) return;
    CSVDataReader.fetch(trainingDataPath).then((CSVData) => {
      if (CSVData) {
        populateTable(CSVData);
      } else {
        fetchAndProcessTrainCSV(numberOfAttempts + 1);
      }
    });
  };

  useEffect(() => {
    fetchAndProcessTrainCSV();
  }, []);

  const getTable = (): JSX.Element => {
    if (trainTable.data.header.length > 0 && trainTable.data.data.length > 0) {
      return <Table header={trainTable.data.header} data={trainTable.data.data} />;
    }
    return <div></div>;
  };

  return <div style={{ width: 'fit-content', margin: 'auto' }}>{getTable()}</div>;
}
