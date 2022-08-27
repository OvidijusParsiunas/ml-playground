import { JSONTableContents } from '../../shared/types/JSONTableContents';
import { TrainTableActionTypes } from './consts';

type UpdateTrainTableDataAction = { type: TrainTableActionTypes.UPDATE_TABLE; payload: JSONTableContents };

type UpdateTrainTableDataCellAction = {
  type: TrainTableActionTypes.UPDATE_TABLE_CELL;
  payload: { rowIndex: number; columnIndex: number; newText: string };
};

export type TrainTableAction = UpdateTrainTableDataAction | UpdateTrainTableDataCellAction;

export type TrainTableState = JSONTableContents;
