import { ResultActionTypes } from './consts';

type SetResultAction = { type: ResultActionTypes.SET_RESULT; payload: { result: ResultState['result'] } };

export type ResultAction = SetResultAction;

export interface ResultState {
  result: string;
}
