import { TableData } from '../../shared/types/tableData';
import { TrainTableActionTypes } from './consts';

type UpdateTrainTableAction = { type: TrainTableActionTypes.UPDATE_TABLE; payload: { data: TableData } };

export type TrainTableAction = UpdateTrainTableAction;

export interface TrainTableState {
  data: TableData;
}
