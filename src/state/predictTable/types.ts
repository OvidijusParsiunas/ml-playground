import { TableData } from '../../shared/types/tableData';
import { PredictTableActionTypes } from './consts';

type UpdatePredictTableAction = {
  type: PredictTableActionTypes.UPDATE_TABLE;
  payload: { data: PredictTableState['data'] };
};

export type PredictTableAction = UpdatePredictTableAction;

export interface PredictTableState {
  data: TableData;
}
