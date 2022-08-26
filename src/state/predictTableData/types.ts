import { JSONTableData } from '../../shared/types/JSONTableData';
import { PredictTableDataActionTypes } from './consts';

type UpdatePredictTableDataAction = {
  type: PredictTableDataActionTypes.UPDATE_TABLE_DATA;
  payload: PredictTableDataState;
};

type UpdatePrecitTableDataCellAction = {
  type: PredictTableDataActionTypes.UPDATE_TABLE_DATA_CELL;
  payload: { rowIndex: number; columnIndex: number; newText: string };
};

export type PredictTableDataAction = UpdatePredictTableDataAction | UpdatePrecitTableDataCellAction;

export type PredictTableDataState = JSONTableData;
