import { PredictTableAction, PredictTableState } from './types';
import { PredictTableActionTypes } from './consts';

const initialState: PredictTableState = {
  table: {},
};

const initialAction: PredictTableAction = {
  type: PredictTableActionTypes.UPDATE_TABLE,
  payload: { table: initialState.table },
};

export const PredictTableReducer = (
  state: PredictTableState = initialState,
  action: PredictTableAction = initialAction,
): PredictTableState => {
  switch (action.type) {
    case PredictTableActionTypes.UPDATE_TABLE: {
      return { ...state, table: action.payload.table };
    }
    case PredictTableActionTypes.UPDATE_TABLE_CELL: {
      const { rowIndex, columnIndex, newText } = action.payload;
      const row = JSON.parse(JSON.stringify(state.table[rowIndex]));
      row[columnIndex] = newText;
      return { ...state, [rowIndex]: row };
    }
    default:
      return state;
  }
};
