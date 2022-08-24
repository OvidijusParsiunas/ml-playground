import { TableData } from '../../shared/types/tableData';
import { PredictTableActionTypes } from './consts';
import { PredictTableAction } from './types';

export const updatePredictTable = (data: TableData): PredictTableAction => ({
  type: PredictTableActionTypes.UPDATE_TABLE,
  payload: { data },
});

export const updateTrainTableCell = (rowIndex: number, columnIndex: number, newText: string): PredictTableAction => ({
  type: PredictTableActionTypes.UPDATE_TABLE_CELL,
  payload: { rowIndex, columnIndex, newText },
});
