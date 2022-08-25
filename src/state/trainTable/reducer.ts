import { TrainTableAction, TrainTableState } from './types';
import { TrainTableActionTypes } from './consts';

const initialState: TrainTableState = {
  table: {},
};

const initialAction: TrainTableAction = {
  type: TrainTableActionTypes.UPDATE_TABLE,
  payload: { table: initialState.table },
};

export const TrainTableReducer = (
  state: TrainTableState = initialState,
  action: TrainTableAction = initialAction,
): TrainTableState => {
  switch (action.type) {
    case TrainTableActionTypes.UPDATE_TABLE: {
      return { ...state, table: action.payload.table };
    }
    case TrainTableActionTypes.UPDATE_TABLE_CELL: {
      const { rowIndex, columnIndex, newText } = action.payload;
      // TO-DO this will all be updated
      const row = JSON.parse(JSON.stringify(state.table[rowIndex]));
      row[columnIndex] = newText;
      return { ...state, [rowIndex]: row };
    }
    default:
      return state;
  }
};
