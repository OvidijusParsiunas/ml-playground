import { PredictTableDataAction, PredictTableDataState } from './types';
import { UpdateTaleDataCell } from '../shared/updateTableDataCell';
import { PredictTableDataActionTypes } from './consts';

const initialState: PredictTableDataState = {};

const initialAction: PredictTableDataAction = {
  type: PredictTableDataActionTypes.UPDATE_TABLE_DATA,
  payload: initialState,
};

export const PredictTableDataReducer = (
  state: PredictTableDataState = initialState,
  action: PredictTableDataAction = initialAction,
): PredictTableDataState => {
  switch (action.type) {
    case PredictTableDataActionTypes.UPDATE_TABLE_DATA: {
      return { ...action.payload };
    }
    case PredictTableDataActionTypes.UPDATE_TABLE_DATA_CELL: {
      const { rowIndex, columnIndex, newText } = action.payload;
      const newRow = UpdateTaleDataCell.getNewRow(rowIndex, columnIndex, newText, state);
      return { ...state, ...newRow };
    }
    default:
      return state;
  }
};
