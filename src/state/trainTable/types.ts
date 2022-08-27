import { JSONTableData } from '../../shared/types/JSONTableData';
import { TableHeader } from '../../shared/types/tableHeader';
import { TrainTableActionTypes } from './consts';

type UpdateTrainTableDataAction = {
  type: TrainTableActionTypes.UPDATE_TABLE_DATA;
  payload: TrainTableState;
};

type UpdateTrainTableDataCellAction = {
  type: TrainTableActionTypes.UPDATE_TABLE_DATA_CELL;
  payload: { rowIndex: number; columnIndex: number; newText: string };
};

type UpdateTrainTableHeadersAction = {
  type: TrainTableActionTypes.SET_TABLE_HEADERS;
  payload: TableHeader[];
};

type SetTrainTableHeadersWithText = {
  type: TrainTableActionTypes.SET_TABLE_HEADERS_WITH_TEXT;
  payload: { headersRow: string[] };
};

type UpdateTrainTableHeaderText = {
  type: TrainTableActionTypes.UPDATE_TABLE_HEADER_TEXT;
  payload: { columnIndex: number; newText: string };
};

export type TrainTableAction =
  | UpdateTrainTableDataAction
  | UpdateTrainTableDataCellAction
  | UpdateTrainTableHeadersAction
  | SetTrainTableHeadersWithText
  | UpdateTrainTableHeaderText;

export type TrainTableState = { headers: TableHeader[]; data: JSONTableData };
