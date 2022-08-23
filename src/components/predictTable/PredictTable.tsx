import { CSVDataReader } from '../../shared/functionality/CSVDataReader';
import { updatePredictTable } from '../../state/predictTable/actions';
import { useDispatch, useSelector } from 'react-redux';
import { RootReducer } from '../../state/rootReducer';
import { CSVData } from '../../shared/types/CSVData';
import Table from '../table/Table';
import { useEffect } from 'react';

export default function PredictTable() {
  const predictDataPath = 'data/predict.csv';

  const dispatch = useDispatch();
  const predictTable = useSelector<RootReducer, RootReducer['predictTable']>((state) => state.predictTable);

  const populateTable = (CSVData: CSVData): void => {
    const tableData = { header: CSVData[0], data: CSVData.slice(1) };
    dispatch(updatePredictTable(tableData));
  };

  // TO-DO same middleware as training table
  const fetchAndProcessPredictCSV = (numberOfAttempts = 0): void => {
    if (numberOfAttempts > 3) return;
    CSVDataReader.fetch(predictDataPath).then((CSVData) => {
      if (CSVData) {
        populateTable(CSVData);
      } else {
        fetchAndProcessPredictCSV(numberOfAttempts + 1);
      }
    });
  };

  useEffect(() => {
    fetchAndProcessPredictCSV();
  }, []);

  const getTable = (): JSX.Element => {
    if (predictTable.data.header.length > 0 && predictTable.data.data.length > 0) {
      return <Table header={predictTable.data.header} data={predictTable.data.data} />;
    }
    return <div></div>;
  };

  return <div style={{ width: 'fit-content', margin: 'auto' }}>{getTable()}</div>;
}
