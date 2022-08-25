import { JSONTable } from '../../shared/types/JSONTable';
import { TrainTableActionTypes } from './consts';

type UpdateTrainTableAction = { type: TrainTableActionTypes.UPDATE_TABLE; payload: { table: TrainTableState['table'] } };

type UpdateTrainTableCellAction = {
  type: TrainTableActionTypes.UPDATE_TABLE_CELL;
  payload: { rowIndex: number; columnIndex: number; newText: string };
};

export type TrainTableAction = UpdateTrainTableAction | UpdateTrainTableCellAction;

export interface TrainTableState {
  table: JSONTable;
}
