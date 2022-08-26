import { PredictTableDataReducer } from './predictTableData/reducer';
import { TrainTableDataReducer } from './trainTableData/reducer';
import { PredictTableDataState } from './predictTableData/types';
import { TableMetaDataReducer } from './tableMetaData/reducer';
import { TrainTableDataState } from './trainTableData/types';
import { TableMetaDataState } from './tableMetaData/types';
import { CombinedState, combineReducers } from 'redux';
import { ResultReducer } from './result/reducer';
import { ModelReducer } from './model/reducer';
import { ResultState } from './result/types';
import { Reducer } from '@reduxjs/toolkit';
import { ModelState } from './model/types';

export type RootReducer = {
  model: ModelState;
  result: ResultState;
  tableMetaData: TableMetaDataState;
  trainTableData: TrainTableDataState;
  predictTableData: PredictTableDataState;
};

export const rootReducer: Reducer<CombinedState<RootReducer>, never> = combineReducers({
  model: ModelReducer,
  result: ResultReducer,
  tableMetaData: TableMetaDataReducer,
  trainTableData: TrainTableDataReducer,
  predictTableData: PredictTableDataReducer,
});
