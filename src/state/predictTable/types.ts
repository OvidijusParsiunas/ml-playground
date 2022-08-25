import { JSONTable } from '../../shared/types/JSONTable';
import { PredictTableActionTypes } from './consts';

type UpdatePredictTableAction = {
  type: PredictTableActionTypes.UPDATE_TABLE;
  payload: { table: PredictTableState['table'] };
};

type UpdatePrecitTableCellAction = {
  type: PredictTableActionTypes.UPDATE_TABLE_CELL;
  payload: { rowIndex: number; columnIndex: number; newText: string };
};

export type PredictTableAction = UpdatePredictTableAction | UpdatePrecitTableCellAction;

export interface PredictTableState {
  table: JSONTable;
}
