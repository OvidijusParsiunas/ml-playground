import { JSONTableData } from '../../shared/types/JSONTableData';
import { PredictTableActionTypes } from '../predictTable/consts';
import { TrainTableActionTypes } from '../trainTable/consts';

export type UpdateTableActionsTypes = TrainTableActionTypes.UPDATE_TABLE_DATA | PredictTableActionTypes.UPDATE_TABLE_DATA;

export type UpdateTablCellActionsTypes =
  | TrainTableActionTypes.UPDATE_TABLE_DATA_CELL
  | PredictTableActionTypes.UPDATE_TABLE_DATA_CELL;

export type UpdateTableAction = {
  type: UpdateTableActionsTypes;
  payload: JSONTableData;
};

export type UpdateTableCellAction = {
  type: UpdateTablCellActionsTypes;
  payload: { rowIndex: number; columnIndex: number; newText: string };
};
