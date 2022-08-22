import { TrainTableReducer } from './trainTable/reducer';
import { CombinedState, combineReducers } from 'redux';
import { TrainTableState } from './trainTable/types';
import type { Reducer } from '@reduxjs/toolkit';

export type RootReducer = {
  trainTable: TrainTableState;
};

export const rootReducer: Reducer<CombinedState<RootReducer>, never> = combineReducers({
  trainTable: TrainTableReducer,
});
