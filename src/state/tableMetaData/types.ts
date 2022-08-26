import { TableMetaDataActionTypes } from './consts';

type SetHeadersAction = { type: TableMetaDataActionTypes.SET_HEADERS_META_DATA; payload: { headers: HeadersMetaData } };

export type TableMetaDataAction = SetHeadersAction;

export type HeaderColumnType = 'number' | 'string';

export type HeaderMetaData = {
  text: string;
  type: HeaderColumnType;
};

export type HeadersMetaData = HeaderMetaData[];

export interface TableMetaDataState {
  headers: HeadersMetaData;
}
