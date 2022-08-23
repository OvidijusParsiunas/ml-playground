import { PredictTableAction, PredictTableState } from './types';
import { PredictTableActionTypes } from './consts';

const initialState: PredictTableState = {
  data: { header: [], data: [] },
};

const initialAction: PredictTableAction = {
  type: PredictTableActionTypes.UPDATE_TABLE,
  payload: { data: initialState.data },
};

export const PredictTableReducer = (
  state: PredictTableState = initialState,
  action: PredictTableAction = initialAction,
): PredictTableState => {
  switch (action.type) {
    case PredictTableActionTypes.UPDATE_TABLE: {
      return { ...state, data: action.payload.data };
    }
    default:
      return state;
  }
};
