import { TableHeaders } from '../../shared/types/tableHeader';
import { TrainTableActionTypes } from './consts';
import { TrainTableAction } from './types';

export const setTrainTableHeaders = (headers: TableHeaders): TrainTableAction => ({
  type: TrainTableActionTypes.SET_TABLE_HEADERS,
  payload: headers,
});

export const setTrainTableHeadersWithText = (headersRow: string[]): TrainTableAction => ({
  type: TrainTableActionTypes.SET_TABLE_HEADERS_WITH_TEXT,
  payload: { headersRow },
});

export const updateTrainTableHeaderText = (columnIndex: number, newText: string): TrainTableAction => ({
  type: TrainTableActionTypes.UPDATE_TABLE_HEADER_TEXT,
  payload: { columnIndex, newText },
});
