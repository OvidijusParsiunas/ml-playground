import { ModelAction, ModelState } from './types';
import { ModelActionTypes } from './consts';

const initialState: ModelState = {
  model: null,
};

const initialAction: ModelAction = {
  type: ModelActionTypes.SET_MODEL,
  payload: { model: initialState.model },
};

export const ModelReducer = (state: ModelState = initialState, action: ModelAction = initialAction): ModelState => {
  switch (action.type) {
    case ModelActionTypes.SET_MODEL: {
      return { ...state, model: action.payload.model };
    }
    default:
      return state;
  }
};
