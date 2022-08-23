import { PredictTableReducer } from './predictTable/reducer';
import { TrainTableReducer } from './trainTable/reducer';
import { PredictTableState } from './predictTable/types';
import { CombinedState, combineReducers } from 'redux';
import { TrainTableState } from './trainTable/types';
import { ResultReducer } from './result/reducer';
import type { Reducer } from '@reduxjs/toolkit';
import { ModelReducer } from './model/reducer';
import { ResultState } from './result/types';
import { ModelState } from './model/types';

export type RootReducer = {
  model: ModelState;
  result: ResultState;
  trainTable: TrainTableState;
  predictTable: PredictTableState;
};

export const rootReducer: Reducer<CombinedState<RootReducer>, never> = combineReducers({
  model: ModelReducer,
  result: ResultReducer,
  trainTable: TrainTableReducer,
  predictTable: PredictTableReducer,
});
