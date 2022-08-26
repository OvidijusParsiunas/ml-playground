import {
  UpdateTableCellActionsTypes,
  UpdateTableActionsTypes,
  UpdateTableCellAction,
  UpdateTableAction,
} from '../../state/shared/tableActions';
import { CSVDataReader } from '../../shared/functionality/CSVDataReader';
import { TableContents } from '../../shared/types/TableContents';
import { JSONTable } from '../../shared/types/JSONTable';
import { CSVData } from '../../shared/types/CSVData';
import { useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import Table from './Table';

interface Props {
  initialCSVDataPath: string;
  updateTableDispatchAction: UpdateTableActionsTypes;
  updateTableCellDispatchAction: UpdateTableCellActionsTypes;
}

// https://codesandbox.io/s/editable-react-table-gchwp?fontsize=14&hidenavigation=1&theme=dark&file=/src/App.js
// https://react-data-table-component.netlify.app/?path=/docs/getting-started-patterns--page
// https://github.com/revolist/revogrid
export default function StatefulTable(props: Props) {
  const { initialCSVDataPath, updateTableDispatchAction, updateTableCellDispatchAction } = props;

  const dispatch = useDispatch();

  const initialTableContents = useRef<TableContents>([]);
  const forceRerender = useState<boolean>(false)[1];

  const updateTableState = (arrayTable: TableContents) => {
    const JSONTable = convertTableToJSON(arrayTable);
    dispatch({
      type: updateTableDispatchAction,
      payload: JSONTable,
    } as UpdateTableAction);
  };

  const convertTableToJSON = (tableContents: TableContents): JSONTable => {
    return tableContents.reduce(
      (accumulator: JSONTable, v: string[], rowIndex: number) => ({ ...accumulator, [rowIndex]: v }),
      {},
    );
  };

  const updateTableCellState = (rowIndex: number, columnIndex: number, newText: string) => {
    dispatch({
      type: updateTableCellDispatchAction,
      payload: { rowIndex, columnIndex, newText },
    } as UpdateTableCellAction);
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
      return <Table initialContent={initialTableContents.current} cellUpdated={updateTableCellState} />;
    }
    return <div></div>;
  };

  return <div style={{ width: 'fit-content', margin: 'auto' }}>{getTable()}</div>;
}
