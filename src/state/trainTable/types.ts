import { TableData } from '../../shared/types/tableData';
import { TrainTableActionTypes } from './consts';

type UpdateTrainTableAction = { type: TrainTableActionTypes.UPDATE_TABLE; payload: { data: TrainTableState['data'] } };

type UpdateTrainTableCellAction = {
  type: TrainTableActionTypes.UPDATE_TABLE_CELL;
  payload: { rowIndex: number; columnIndex: number; newText: string };
};

export type TrainTableAction = UpdateTrainTableAction | UpdateTrainTableCellAction;

export interface TrainTableState {
  data: TableData;
}
