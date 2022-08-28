import { JSONTableData } from '../../shared/types/JSONTableData';
import { TableHeaders } from '../../shared/types/tableHeader';
import { TrainTableAction, TrainTableState } from './types';
import { UpdateTableCell } from '../shared/updateTableCell';
import { TrainTableActionTypes } from './consts';

// TO-DO this table may be placed in the same store as the predict table - stores, see if it has anything unique later on
const initialState: TrainTableState = { headers: [], data: {} };

const initialAction: TrainTableAction = {
  type: TrainTableActionTypes.UPDATE_TABLE_DATA,
  payload: initialState,
};

export const TrainTableReducer = (
  state: TrainTableState = initialState,
  action: TrainTableAction = initialAction,
): TrainTableState => {
  switch (action.type) {
    case TrainTableActionTypes.UPDATE_TABLE_DATA: {
      return { ...state, data: action.payload };
    }
    case TrainTableActionTypes.UPDATE_TABLE_DATA_CELL: {
      const { rowIndex, columnIndex, newText } = action.payload;
      const newRow: JSONTableData = UpdateTableCell.getUpdatedRowWithNewText(rowIndex, columnIndex, newText, state.data);
      return { ...state, data: { ...state.data, ...newRow } };
    }
    case TrainTableActionTypes.SET_TABLE_HEADERS: {
      return { ...state, headers: action.payload };
    }
    case TrainTableActionTypes.SET_TABLE_HEADERS_WITH_TEXT: {
      const { headersRow } = action.payload;
      const newHeaders: TableHeaders = headersRow.map((headerText) => ({ text: headerText }));
      return { ...state, headers: newHeaders };
    }
    case TrainTableActionTypes.UPDATE_TABLE_HEADER_TEXT: {
      const { columnIndex, newText } = action.payload;
      const newHeaders: TableHeaders = UpdateTableCell.getUpdatedHeadersWithNewText(columnIndex, newText, state.headers);
      return { ...state, headers: newHeaders };
    }
    default:
      return state;
  }
};
