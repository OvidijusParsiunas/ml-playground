import { PredictTableActionTypes } from '../predictTable/consts';
import { TrainTableActionTypes } from '../trainTable/consts';
import { JSONTable } from '../../shared/types/JSONTable';

export type UpdateTableActionsTypes = TrainTableActionTypes.UPDATE_TABLE | PredictTableActionTypes.UPDATE_TABLE;

export type UpdateTableCellActionsTypes =
  | TrainTableActionTypes.UPDATE_TABLE_CELL
  | PredictTableActionTypes.UPDATE_TABLE_CELL;

export type UpdateTableAction = {
  type: UpdateTableActionsTypes;
  payload: { table: JSONTable };
};

export type UpdateTableCellAction = {
  type: UpdateTableCellActionsTypes;
  payload: { rowIndex: number; columnIndex: number; newText: string };
};
