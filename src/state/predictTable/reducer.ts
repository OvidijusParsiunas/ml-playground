import { JSONTableData } from '../../shared/types/JSONTableData';
import { PredictTableAction, PredictTableState } from './types';
import { TableHeaders } from '../../shared/types/tableHeader';
import { UpdateTableCell } from '../shared/updateTableCell';
import { PredictTableActionTypes } from './consts';

const initialState: PredictTableState = { headers: [], data: {} };

const initialAction: PredictTableAction = {
  type: PredictTableActionTypes.UPDATE_TABLE_DATA,
  payload: initialState,
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
      const newRow: JSONTableData = UpdateTableCell.getUpdatedRowWithNewText(rowIndex, columnIndex, newText, state.data);
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
      const newHeaders: TableHeaders = UpdateTableCell.getUpdatedHeadersWithNewText(columnIndex, newText, state.headers);
      return { ...state, headers: newHeaders };
    }
    default:
      return state;
  }
};
