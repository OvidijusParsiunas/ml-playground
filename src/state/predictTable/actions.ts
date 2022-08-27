import { TableHeaders } from '../../shared/types/tableHeader';
import { PredictTableActionTypes } from './consts';
import { PredictTableAction } from './types';

export const setPredictTableHeaders = (headers: TableHeaders): PredictTableAction => ({
  type: PredictTableActionTypes.SET_TABLE_HEADERS,
  payload: headers,
});

export const setPredictTableHeadersWithText = (headersRow: string[]): PredictTableAction => ({
  type: PredictTableActionTypes.SET_TABLE_HEADERS_WITH_TEXT,
  payload: { headersRow },
});

export const updatePredictTableHeaderText = (columnIndex: number, newText: string): PredictTableAction => ({
  type: PredictTableActionTypes.UPDATE_TABLE_HEADER_TEXT,
  payload: { columnIndex, newText },
});
