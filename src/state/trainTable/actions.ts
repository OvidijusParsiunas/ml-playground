import { TableData } from '../../shared/types/tableData';
import { TrainTableActionTypes } from './consts';
import { TrainTableAction } from './types';

export const updateTrainTable = (data: TableData): TrainTableAction => ({
  type: TrainTableActionTypes.UPDATE_TABLE,
  payload: { data },
});
