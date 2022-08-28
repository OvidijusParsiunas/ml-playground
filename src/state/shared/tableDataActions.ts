import { JSONTableData } from '../../shared/types/JSONTableData';
import { PredictTableActionTypes } from '../predictTable/consts';
import { TrainTableActionTypes } from '../trainTable/consts';

export type UpdateTableDataActionsTypes =
  | TrainTableActionTypes.UPDATE_TABLE_DATA
  | PredictTableActionTypes.UPDATE_TABLE_DATA;

export type UpdateTableDataCellActionsTypes =
  | TrainTableActionTypes.UPDATE_TABLE_DATA_CELL
  | PredictTableActionTypes.UPDATE_TABLE_DATA_CELL;

export type UpdateTableDataAction = {
  type: UpdateTableDataActionsTypes;
  payload: JSONTableData;
};

export type UpdateTableDataCellAction = {
  type: UpdateTableDataCellActionsTypes;
  payload: { rowIndex: number; columnIndex: number; newText: string };
};
