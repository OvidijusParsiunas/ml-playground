import { JSONTableData } from '../../shared/types/JSONTableData';
import { TableHeader } from '../../shared/types/tableHeader';
import { PredictTableActionTypes } from './consts';

type UpdatePredictTableDataAction = {
  type: PredictTableActionTypes.UPDATE_TABLE_DATA;
  payload: PredictTableState;
};

type UpdatePredictTableDataCellAction = {
  type: PredictTableActionTypes.UPDATE_TABLE_DATA_CELL;
  payload: { rowIndex: number; columnIndex: number; newText: string };
};

type UpdatePredictTableHeadersAction = {
  type: PredictTableActionTypes.SET_TABLE_HEADERS;
  payload: TableHeader[];
};

type SetPredictTableHeadersWithText = {
  type: PredictTableActionTypes.SET_TABLE_HEADERS_WITH_TEXT;
  payload: { headersRow: string[] };
};

type UpdatePredictTableHeaderText = {
  type: PredictTableActionTypes.UPDATE_TABLE_HEADER_TEXT;
  payload: { columnIndex: number; newText: string };
};

export type PredictTableAction =
  | UpdatePredictTableDataAction
  | UpdatePredictTableDataCellAction
  | UpdatePredictTableHeadersAction
  | SetPredictTableHeadersWithText
  | UpdatePredictTableHeaderText;

export type PredictTableState = { headers: TableHeader[]; data: JSONTableData };
