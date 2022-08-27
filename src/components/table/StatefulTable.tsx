import {
  UpdateTableDataCellActionsTypes,
  UpdateTableDataActionsTypes,
  UpdateTableCellDataAction,
  UpdateTableDataAction,
} from '../../state/shared/tableDataActions';
import { setHeadersWithText, updateHeaderText } from '../../state/tableMetaData/actions';
import { TableContents, TableRow } from '../../shared/types/tableContents';
import { CSVReader } from '../../shared/functionality/CSVReader';
import { JSONTableData } from '../../shared/types/JSONTableData';
import { CSV } from '../../shared/types/CSV';
import { useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import Table from './Table';

interface Props {
  initialCSVPath: string;
  areHeadersEditable?: boolean;
  isControllingHeaders?: boolean;
  updateTableDispatchAction: UpdateTableDataActionsTypes;
  updateTableCellDispatchAction: UpdateTableDataCellActionsTypes;
}

// https://codesandbox.io/s/editable-react-table-gchwp?fontsize=14&hidenavigation=1&theme=dark&file=/src/App.js
// https://react-data-table-component.netlify.app/?path=/docs/getting-started-patterns--page
// https://github.com/revolist/revogrid
export default function StatefulTable(props: Props) {
  const {
    initialCSVPath,
    areHeadersEditable,
    isControllingHeaders,
    updateTableDispatchAction,
    updateTableCellDispatchAction,
  } = props;

  const dispatch = useDispatch();

  const initialTableContents = useRef<TableContents>([]);
  const forceRerender = useState<boolean>(false)[1];

  const updateTableStores = (CSV: CSV) => {
    const JSONTableData = convertTableToJSON(CSV.slice(1));
    dispatch({
      type: updateTableDispatchAction,
      payload: JSONTableData,
    } as UpdateTableDataAction);
    if (isControllingHeaders) dispatch(setHeadersWithText(CSV[0]));
  };

  const convertTableToJSON = (tableData: TableContents): JSONTableData => {
    return tableData.reduce(
      (accumulator: JSONTableData, row: TableRow, rowIndex: number) => ({ ...accumulator, [rowIndex]: row }),
      {},
    );
  };

  const updateTableCellStore = (rowIndex: number, columnIndex: number, newText: string) => {
    if (rowIndex === 0) {
      dispatch(updateHeaderText(columnIndex, newText));
    } else {
      dispatch({
        type: updateTableCellDispatchAction,
        payload: { rowIndex, columnIndex, newText },
      } as UpdateTableCellDataAction);
    }
  };

  const populateTable = (CSV: CSV): void => {
    initialTableContents.current = CSV;
    forceRerender(true);
  };

  const fetchAndProcessTrainCSV = (numberOfAttempts = 0): void => {
    if (numberOfAttempts > 3) return;
    CSVReader.fetch(initialCSVPath).then((CSV) => {
      if (CSV) {
        populateTable(CSV);
        updateTableStores(CSV);
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
      return (
        <Table
          initialContent={initialTableContents.current}
          cellUpdated={updateTableCellStore}
          areHeadersEditable={areHeadersEditable}
        />
      );
    }
    return <div></div>;
  };

  return <div style={{ width: 'fit-content', margin: 'auto' }}>{getTable()}</div>;
}

StatefulTable.defaultProps = {
  areHeadersEditable: true,
};
