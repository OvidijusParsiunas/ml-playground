import { ResultActionTypes } from './consts';
import { ResultAction } from './types';

export const setResult = (result: string): ResultAction => ({
  type: ResultActionTypes.SET_RESULT,
  payload: { result },
});
