import { JSONTableData } from '../../shared/types/JSONTableData';
import { TrainTableActionTypes } from './consts';

type UpdateTrainTableDataAction = { type: TrainTableActionTypes.UPDATE_TABLE_DATA; payload: JSONTableData };

type UpdateTrainTableDataCellAction = {
  type: TrainTableActionTypes.UPDATE_TABLE_DATA_CELL;
  payload: { rowIndex: number; columnIndex: number; newText: string };
};

export type TrainTableDataAction = UpdateTrainTableDataAction | UpdateTrainTableDataCellAction;

export type TrainTableDataState = JSONTableData;
