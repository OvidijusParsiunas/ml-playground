import { TableData } from '../../shared/types/tableData';
import { TrainTableActionTypes } from './consts';

type UpdateTrainTableAction = { type: TrainTableActionTypes.UPDATE_TABLE; payload: { data: TrainTableState['data'] } };

export type TrainTableAction = UpdateTrainTableAction;

export interface TrainTableState {
  data: TableData;
}
