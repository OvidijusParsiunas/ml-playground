import { JSONTable } from '../../shared/types/JSONTable';
import { TrainTableActionTypes } from './consts';
import { TrainTableAction } from './types';

export const updateTrainTable = (table: JSONTable): TrainTableAction => ({
  type: TrainTableActionTypes.UPDATE_TABLE,
  payload: { table },
});

export const updateTrainTableCell = (rowIndex: number, columnIndex: number, newText: string): TrainTableAction => ({
  type: TrainTableActionTypes.UPDATE_TABLE_CELL,
  payload: { rowIndex, columnIndex, newText },
});
