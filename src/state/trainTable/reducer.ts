import { TableHeader, TableHeaders } from '../../shared/types/tableHeader';
import { TrainTableAction, TrainTableState } from './types';
import { UpdateTableCell } from '../shared/updateTableCell';
import { TrainTableActionTypes } from './consts';

const initialState: TrainTableState = { headers: [], data: {} };

const initialAction: TrainTableAction = {
  type: TrainTableActionTypes.UPDATE_TABLE_DATA,
  payload: initialState,
};

const updateHeaderText = (columnIndex: number, newText: string, headers: TableHeaders) => {
  return headers.map((header: TableHeader, index: number) => {
    if (columnIndex === index) {
      return { text: newText, type: header.type };
    }
    return { ...header };
  });
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
      const newRow = UpdateTableCell.getNewRow(rowIndex, columnIndex, newText, state.data, false);
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
      const newHeaders: TableHeaders = updateHeaderText(columnIndex, newText, state.headers);
      return { ...state, headers: newHeaders };
    }
    default:
      return state;
  }
};
