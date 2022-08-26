import { PredictTableDataActionTypes } from '../predictTableData/consts';
import { TrainTableActionTypes } from '../trainTableData/consts';
import { JSONTableData } from '../../shared/types/JSONTableData';

export type UpdateTableDataActionsTypes =
  | TrainTableActionTypes.UPDATE_TABLE_DATA
  | PredictTableDataActionTypes.UPDATE_TABLE_DATA;

export type UpdateTableDataCellActionsTypes =
  | TrainTableActionTypes.UPDATE_TABLE_DATA_CELL
  | PredictTableDataActionTypes.UPDATE_TABLE_DATA_CELL;

export type UpdateTableDataAction = {
  type: UpdateTableDataActionsTypes;
  payload: JSONTableData;
};

export type UpdateTableCellDataAction = {
  type: UpdateTableDataCellActionsTypes;
  payload: { rowIndex: number; columnIndex: number; newText: string };
};
