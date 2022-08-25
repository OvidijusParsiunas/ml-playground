import { PredictTableAction, PredictTableState } from './types';
import { TrainTableState } from '../trainTable/types';
import { PredictTableActionTypes } from './consts';

const initialState: TrainTableState = {};

const initialAction: PredictTableAction = {
  type: PredictTableActionTypes.UPDATE_TABLE,
  payload: initialState,
};

export const PredictTableReducer = (
  state: PredictTableState = initialState,
  action: PredictTableAction = initialAction,
): PredictTableState => {
  switch (action.type) {
    case PredictTableActionTypes.UPDATE_TABLE: {
      return { ...action.payload };
    }
    case PredictTableActionTypes.UPDATE_TABLE_CELL: {
      const { rowIndex, columnIndex, newText } = action.payload;
      const row = JSON.parse(JSON.stringify(state[rowIndex]));
      row[columnIndex] = newText;
      return { ...state, [rowIndex]: row };
    }
    default:
      return state;
  }
};
