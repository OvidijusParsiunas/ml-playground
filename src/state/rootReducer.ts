import { TableMetaDataReducer } from './tableMetaData/reducer';
import { PredictTableReducer } from './predictTable/reducer';
import { TableMetaDataState } from './tableMetaData/types';
import { TrainTableReducer } from './trainTable/reducer';
import { PredictTableState } from './predictTable/types';
import { CombinedState, combineReducers } from 'redux';
import { TrainTableState } from './trainTable/types';
import { ResultReducer } from './result/reducer';
import { ModelReducer } from './model/reducer';
import { ResultState } from './result/types';
import { Reducer } from '@reduxjs/toolkit';
import { ModelState } from './model/types';

export type RootReducer = {
  model: ModelState;
  result: ResultState;
  tableMetaData: TableMetaDataState;
  trainTable: TrainTableState;
  predictTable: PredictTableState;
};

export const rootReducer: Reducer<CombinedState<RootReducer>, never> = combineReducers({
  model: ModelReducer,
  result: ResultReducer,
  tableMetaData: TableMetaDataReducer,
  trainTable: TrainTableReducer,
  predictTable: PredictTableReducer,
});
