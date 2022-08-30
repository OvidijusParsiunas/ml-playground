import {
  UpdateTableDataCellActionsTypes,
  UpdateTableDataActionsTypes,
  UpdateTableDataCellAction,
  UpdateTableDataAction,
} from '../../state/shared/tableDataActions';
import { setPredictTableHeadersWithText, updatePredictTableHeaderText } from '../../state/predictTable/actions';
import { setTrainTableHeadersWithText, updateTrainTableHeaderText } from '../../state/trainTable/actions';
import { TableContents, TableRow } from '../../shared/types/tableContents';
import { JSONTableData } from '../../shared/types/JSONTableData';
import { CSVReader } from '../../shared/functionality/CSVReader';
import { useDispatch, useSelector } from 'react-redux';
import { RootReducer } from '../../state/rootReducer';
import { CSV } from '../../shared/types/CSV';
import { useEffect, useRef } from 'react';
import { store } from '../../state/store';
import { useState } from 'react';
import Table from './Table';

interface Props {
  initialCSVPath: string;
  isPredictTable?: boolean;
  areHeadersEditable?: boolean;
  isTrainTable?: boolean;
  updateTableDataDispatchAction: UpdateTableDataActionsTypes;
  updateTableDataCellDispatchAction: UpdateTableDataCellActionsTypes;
}

// https://codesandbox.io/s/editable-react-table-gchwp?fontsize=14&hidenavigation=1&theme=dark&file=/src/App.js
// https://react-data-table-component.netlify.app/?path=/docs/getting-started-patterns--page
// https://github.com/revolist/revogrid
export default function StatefulTable(props: Props) {
  const {
    initialCSVPath,
    isPredictTable,
    areHeadersEditable,
    isTrainTable,
    updateTableDataDispatchAction,
    updateTableDataCellDispatchAction,
  } = props;

  const dispatch = useDispatch();

  const initialTableContents = useRef<TableContents>([]);
  const forceRerender = useState<boolean>(false)[1];
  const predictHeaders = isPredictTable
    ? useSelector<RootReducer, RootReducer['predictTable']['headers']>((state) => state.predictTable.headers)
    : null;

  const isPredictTableHeaderControlledByTrainTable = (): boolean => {
    return !!(isTrainTable && !store.getState().predictTable.headers?.[0]?.type);
  };

  const updateTableStores = (CSV: CSV) => {
    const JSONTableData = convertTableToJSON(CSV.slice(1));
    dispatch({ type: updateTableDataDispatchAction, payload: JSONTableData } as UpdateTableDataAction);
    if (isTrainTable) {
      dispatch(setTrainTableHeadersWithText(CSV[0]));
      if (isPredictTableHeaderControlledByTrainTable()) {
        dispatch(setPredictTableHeadersWithText(CSV[0].slice(0, CSV[0].length - 1)));
      }
    }
  };

  const convertTableToJSON = (tableData: TableContents): JSONTableData => {
    return tableData.reduce(
      (accumulator: JSONTableData, row: TableRow, rowIndex: number) => ({ ...accumulator, [rowIndex]: row }),
      {},
    );
  };

  const updateTableCellStore = (rowIndex: number, columnIndex: number, newText: string) => {
    if (rowIndex === 0) {
      dispatch(updateTrainTableHeaderText(columnIndex, newText));
      if (isPredictTableHeaderControlledByTrainTable()) {
        dispatch(updatePredictTableHeaderText(columnIndex, newText));
      }
    } else {
      dispatch({
        type: updateTableDataCellDispatchAction,
        payload: { rowIndex, columnIndex, newText },
      } as UpdateTableDataCellAction);
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
          headers={predictHeaders?.map((header) => header.text)}
          defaultValue={'-'}
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
