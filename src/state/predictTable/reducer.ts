import { TableHeader, TableHeaders } from '../../shared/types/tableHeader';
import { PredictTableAction, PredictTableState } from './types';
import { UpdateTableCell } from '../shared/updateTableCell';
import { PredictTableActionTypes } from './consts';

const initialState: PredictTableState = { headers: [], data: {} };

const initialAction: PredictTableAction = {
  type: PredictTableActionTypes.UPDATE_TABLE_DATA,
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

export const PredictTableReducer = (
  state: PredictTableState = initialState,
  action: PredictTableAction = initialAction,
): PredictTableState => {
  switch (action.type) {
    case PredictTableActionTypes.UPDATE_TABLE_DATA: {
      return { ...state, data: action.payload };
    }
    case PredictTableActionTypes.UPDATE_TABLE_DATA_CELL: {
      const { rowIndex, columnIndex, newText } = action.payload;
      const newRow = UpdateTableCell.getNewRow(rowIndex, columnIndex, newText, state.data, false);
      return { ...state, data: { ...state.data, ...newRow } };
    }
    case PredictTableActionTypes.SET_TABLE_HEADERS: {
      return { ...state, headers: action.payload };
    }
    case PredictTableActionTypes.SET_TABLE_HEADERS_WITH_TEXT: {
      const { headersRow } = action.payload;
      const newHeaders: TableHeaders = headersRow.map((headerText) => ({ text: headerText }));
      return { ...state, headers: newHeaders };
    }
    case PredictTableActionTypes.UPDATE_TABLE_HEADER_TEXT: {
      const { columnIndex, newText } = action.payload;
      const newHeaders: TableHeaders = updateHeaderText(columnIndex, newText, state.headers);
      return { ...state, headers: newHeaders };
    }
    default:
      return state;
  }
};
