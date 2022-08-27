import { TrainTableAction, TrainTableState } from './types';
import { UpdateTableCell } from '../shared/updateTableCell';
import { TrainTableActionTypes } from './consts';

const initialState: TrainTableState = {};

const initialAction: TrainTableAction = {
  type: TrainTableActionTypes.UPDATE_TABLE,
  payload: initialState,
};

export const TrainTableReducer = (
  state: TrainTableState = initialState,
  action: TrainTableAction = initialAction,
): TrainTableState => {
  switch (action.type) {
    case TrainTableActionTypes.UPDATE_TABLE: {
      return { ...action.payload };
    }
    case TrainTableActionTypes.UPDATE_TABLE_CELL: {
      const { rowIndex, columnIndex, newText } = action.payload;
      const newRow = UpdateTableCell.getNewRow(rowIndex, columnIndex, newText, state);
      return { ...state, ...newRow };
    }
    default:
      return state;
  }
};
