import { CSVDataReader } from '../../shared/functionality/CSVDataReader';
import { CSVData } from '../../shared/types/CSVData';
import Table, { TableContents } from './Table';
import { useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';
import { useState } from 'react';

interface Props {
  initialCSVDataPath: string;
  updateTableDispatchAction: string;
  updateTableCellDispatchAction: string;
}

// https://codesandbox.io/s/editable-react-table-gchwp?fontsize=14&hidenavigation=1&theme=dark&file=/src/App.js
// https://react-data-table-component.netlify.app/?path=/docs/getting-started-patterns--page
// https://github.com/revolist/revogrid
export default function StatefulTable(props: Props) {
  const { initialCSVDataPath, updateTableDispatchAction, updateTableCellDispatchAction } = props;

  const dispatch = useDispatch();

  const initialTableContents = useRef<TableContents>([]);
  const forceRerender = useState<boolean>(false)[1];

  const updateTableState = (table: TableContents) => {
    // TO-DO data should be called table
    dispatch({
      type: updateTableDispatchAction,
      payload: { data: { header: table[0], data: table.slice(1) } },
    });
  };

  const udpateTableCellState = (rowIndex: number, columnIndex: number, newText: string) => {
    // TO-DO data should be called table
    // TO-DO update only the area edited
    dispatch({
      type: updateTableCellDispatchAction,
      payload: { rowIndex, columnIndex, newText },
    });
  };

  const populateTable = (CSVData: CSVData): void => {
    initialTableContents.current = CSVData;
    forceRerender(true);
  };

  const fetchAndProcessTrainCSV = (numberOfAttempts = 0): void => {
    if (numberOfAttempts > 3) return;
    CSVDataReader.fetch(initialCSVDataPath).then((CSVData) => {
      if (CSVData) {
        populateTable(CSVData);
        updateTableState(CSVData);
      } else {
        fetchAndProcessTrainCSV(numberOfAttempts + 1);
      }
    });
  };

  useEffect(() => {
    fetchAndProcessTrainCSV();
  }, []);

  const getTable = (): JSX.Element => {
    if (initialTableContents.current.length > 0) {
      return <Table initialContents={initialTableContents.current} tableUpdated={updateTableState} />;
    }
    return <div></div>;
  };

  return <div style={{ width: 'fit-content', margin: 'auto' }}>{getTable()}</div>;
}
