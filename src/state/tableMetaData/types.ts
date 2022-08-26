import { JSONTableData } from '../../shared/types/JSONTableData';
import { TableMetaDataActionTypes } from './consts';
import { TableRow } from '../../shared/types/tableContents';

type UpdateHeadersTypes = {
  type: TableMetaDataActionTypes.UPDATE_HEADERS_TYPES;
  payload: { trainTableData: JSONTableData };
};

type SetHeadersWithTextAction = {
  type: TableMetaDataActionTypes.SET_HEADERS_WITH_TEXT;
  payload: { headersRow: TableRow };
};

export type TableMetaDataAction = UpdateHeadersTypes | SetHeadersWithTextAction;

export type HeaderColumnType = 'number' | 'string';

export type HeaderMetaData = {
  text: string;
  type?: HeaderColumnType;
};

export type HeadersMetaData = HeaderMetaData[];

export interface TableMetaDataState {
  headers: HeadersMetaData;
}
