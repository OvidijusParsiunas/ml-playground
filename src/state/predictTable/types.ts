import { JSONTableContents } from '../../shared/types/JSONTableContents';
import { PredictTableActionTypes } from './consts';

type UpdatePredictTableDataAction = {
  type: PredictTableActionTypes.UPDATE_TABLE_DATA;
  payload: PredictTableState;
};

type UpdatePrecitTableDataCellAction = {
  type: PredictTableActionTypes.UPDATE_TABLE_DATA_CELL;
  payload: { rowIndex: number; columnIndex: number; newText: string };
};

type UpdatePrecitTableHeadersAction = {
  type: PredictTableActionTypes.SET_TABLE_HEADERS;
  payload: HeaderMetaData[];
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
  | UpdatePrecitTableDataCellAction
  | UpdatePrecitTableHeadersAction
  | SetPredictTableHeadersWithText
  | UpdatePredictTableHeaderText;

export type HeaderColumnType = 'number' | 'string';

export type HeaderMetaData = {
  text: string;
  type?: HeaderColumnType;
};

export type PredictTableState = { headers: HeaderMetaData[]; data: JSONTableContents };
