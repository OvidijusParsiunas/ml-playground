import { JSONTableData } from '../../shared/types/JSONTableData';
import { TableRow } from '../../shared/types/tableContents';
import { TableMetaDataActionTypes } from './consts';
import { TableMetaDataAction } from './types';

export const setHeadersWithText = (headers: TableRow): TableMetaDataAction => ({
  type: TableMetaDataActionTypes.SET_HEADERS_WITH_TEXT,
  payload: { headersRow: headers },
});

export const updateHeadersTypes = (trainTableData: JSONTableData): TableMetaDataAction => ({
  type: TableMetaDataActionTypes.UPDATE_HEADERS_TYPES,
  payload: { trainTableData },
});

export const updateHeaderText = (columnIndex: number, newText: string): TableMetaDataAction => ({
  type: TableMetaDataActionTypes.UPDATE_HEADER_TEXT,
  payload: { columnIndex, newText },
});
