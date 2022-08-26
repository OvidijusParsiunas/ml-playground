import { HeadersMetaData, TableMetaDataAction } from './types';
import { TableMetaDataActionTypes } from './consts';

export const setHeadersMetaData = (headers: HeadersMetaData): TableMetaDataAction => ({
  type: TableMetaDataActionTypes.SET_HEADERS_META_DATA,
  payload: { headers },
});
