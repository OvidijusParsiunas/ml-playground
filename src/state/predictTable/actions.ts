import { JSONTable } from '../../shared/types/JSONTable';
import { PredictTableActionTypes } from './consts';
import { PredictTableAction } from './types';

export const updatePredictTable = (table: JSONTable): PredictTableAction => ({
  type: PredictTableActionTypes.UPDATE_TABLE,
  payload: table,
});

export const updateTrainTableCell = (rowIndex: number, columnIndex: number, newText: string): PredictTableAction => ({
  type: PredictTableActionTypes.UPDATE_TABLE_CELL,
  payload: { rowIndex, columnIndex, newText },
});
