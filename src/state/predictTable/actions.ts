import { TableData } from '../../shared/types/tableData';
import { PredictTableActionTypes } from './consts';
import { PredictTableAction } from './types';

export const updatePredictTable = (data: TableData): PredictTableAction => ({
  type: PredictTableActionTypes.UPDATE_TABLE,
  payload: { data },
});
