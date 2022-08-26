import { TrainTableDataAction, TrainTableDataState } from './types';
import { UpdateTaleDataCell } from '../shared/updateTableDataCell';
import { TrainTableActionTypes } from './consts';

const initialState: TrainTableDataState = {};

const initialAction: TrainTableDataAction = {
  type: TrainTableActionTypes.UPDATE_TABLE_DATA,
  payload: initialState,
};

export const TrainTableDataReducer = (
  state: TrainTableDataState = initialState,
  action: TrainTableDataAction = initialAction,
): TrainTableDataState => {
  switch (action.type) {
    case TrainTableActionTypes.UPDATE_TABLE_DATA: {
      return { ...action.payload };
    }
    case TrainTableActionTypes.UPDATE_TABLE_DATA_CELL: {
      const { rowIndex, columnIndex, newText } = action.payload;
      const newRow = UpdateTaleDataCell.getNewRow(rowIndex, columnIndex, newText, state);
      return { ...state, ...newRow };
    }
    default:
      return state;
  }
};
