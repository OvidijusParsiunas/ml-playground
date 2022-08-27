import { JSONTableContents } from '../../shared/types/JSONTableContents';
import { TableRow } from '../../shared/types/tableContents';
import { TableMetaDataActionTypes } from './consts';

type SetHeadersWithTextAction = {
  type: TableMetaDataActionTypes.SET_HEADERS_WITH_TEXT;
  payload: { headersRow: TableRow };
};

type UpdateHeadersTypesAction = {
  type: TableMetaDataActionTypes.UPDATE_HEADERS_TYPES;
  payload: { trainTableData: JSONTableContents };
};

type UpdateHeaderTextAction = {
  type: TableMetaDataActionTypes.UPDATE_HEADER_TEXT;
  payload: { columnIndex: number; newText: string };
};

export type TableMetaDataAction = SetHeadersWithTextAction | UpdateHeadersTypesAction | UpdateHeaderTextAction;

export type HeaderColumnType = 'number' | 'string';

export type HeaderMetaData = {
  text: string;
  type?: HeaderColumnType;
};

export type HeadersMetaData = HeaderMetaData[];

export interface TableMetaDataState {
  headers: HeadersMetaData;
}
