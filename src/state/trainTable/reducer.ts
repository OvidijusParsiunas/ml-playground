import { TrainTableAction, TrainTableState } from './types';
import { TrainTableActionTypes } from './consts';

const initialState: TrainTableState = {
  data: { header: [], data: [] },
};

const initialAction: TrainTableAction = {
  type: TrainTableActionTypes.UPDATE_TABLE,
  payload: { data: initialState.data },
};

export const TrainTableReducer = (
  state: TrainTableState = initialState,
  action: TrainTableAction = initialAction,
): TrainTableState => {
  switch (action.type) {
    case TrainTableActionTypes.UPDATE_TABLE: {
      return { ...state, data: action.payload.data };
    }
    case TrainTableActionTypes.UPDATE_TABLE_CELL: {
      const { rowIndex, columnIndex, newText } = action.payload;
      // TO-DO this will all be updated
      state.data.data[rowIndex][columnIndex] = newText;
      return { ...state };
    }
    default:
      return state;
  }
};
