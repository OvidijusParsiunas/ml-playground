import { JSONTableContents } from '../../shared/types/JSONTableContents';
import { PredictTableActionTypes } from '../predictTable/consts';
import { TrainTableActionTypes } from '../trainTable/consts';

export type UpdateTableActionsTypes = TrainTableActionTypes.UPDATE_TABLE | PredictTableActionTypes.UPDATE_TABLE_DATA;

export type UpdateTablCellActionsTypes =
  | TrainTableActionTypes.UPDATE_TABLE_CELL
  | PredictTableActionTypes.UPDATE_TABLE_DATA_CELL;

export type UpdateTableAction = {
  type: UpdateTableActionsTypes;
  payload: JSONTableContents;
};

export type UpdateTableCellAction = {
  type: UpdateTablCellActionsTypes;
  payload: { rowIndex: number; columnIndex: number; newText: string };
};
