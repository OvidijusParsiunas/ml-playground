import { TrainTableAction, TrainTableState } from './types';
import { JSONTable } from '../../shared/types/JSONTable';
import { TrainTableActionTypes } from './consts';

const initialState: JSONTable = {};

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
      const row = JSON.parse(JSON.stringify(state[rowIndex]));
      row[columnIndex] = newText;
      return { ...state, [rowIndex]: row };
    }
    default:
      return state;
  }
};
