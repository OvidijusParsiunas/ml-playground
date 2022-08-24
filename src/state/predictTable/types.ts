import { TableData } from '../../shared/types/tableData';
import { PredictTableActionTypes } from './consts';

type UpdatePredictTableAction = {
  type: PredictTableActionTypes.UPDATE_TABLE;
  payload: { data: PredictTableState['data'] };
};

type UpdatePrecitTableCellAction = {
  type: PredictTableActionTypes.UPDATE_TABLE_CELL;
  payload: { rowIndex: number; columnIndex: number; newText: string };
};

export type PredictTableAction = UpdatePredictTableAction | UpdatePrecitTableCellAction;

export interface PredictTableState {
  data: TableData;
}
