import { JSONTableData } from '../../shared/types/JSONTableData';
import { TableMetaDataActionTypes } from './consts';
import { TableMetaDataAction } from './types';
import { TableRow } from '../../shared/types/tableContents';

export const updateHeadersTypes = (trainTableData: JSONTableData): TableMetaDataAction => ({
  type: TableMetaDataActionTypes.UPDATE_HEADERS_TYPES,
  payload: { trainTableData },
});

export const setHeadersWithText = (headers: TableRow): TableMetaDataAction => ({
  type: TableMetaDataActionTypes.SET_HEADERS_WITH_TEXT,
  payload: { headersRow: headers },
});
