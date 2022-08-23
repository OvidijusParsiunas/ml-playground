import { ResultAction, ResultState } from './types';
import { ResultActionTypes } from './consts';

const initialState: ResultState = {
  result: '',
};

const initialAction: ResultAction = {
  type: ResultActionTypes.SET_RESULT,
  payload: { result: initialState.result },
};

export const ResultReducer = (state: ResultState = initialState, action: ResultAction = initialAction): ResultState => {
  switch (action.type) {
    case ResultActionTypes.SET_RESULT: {
      return { ...state, result: action.payload.result };
    }
    default:
      return state;
  }
};
