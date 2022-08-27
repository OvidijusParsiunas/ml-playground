import { HeaderMetaData, HeadersMetaData, TableMetaDataAction, TableMetaDataState } from './types';
import { JSONTableData } from '../../shared/types/JSONTableData';
import { TableMetaDataActionTypes } from './consts';

const initialState: TableMetaDataState = {
  headers: [],
};

const initialAction: TableMetaDataAction = {
  type: TableMetaDataActionTypes.UPDATE_HEADERS_TYPES,
  payload: { trainTableData: {} },
};

const updateHeaderText = (columnIndex: number, newText: string, headersMetaData: HeadersMetaData) => {
  return headersMetaData.map((header: HeaderMetaData, index) => {
    if (columnIndex === index) {
      return { text: newText, type: header.type };
    }
    return { ...header };
  });
};

const updateHeadersTypes = (trainTableData: JSONTableData, headers: HeadersMetaData): HeadersMetaData => {
  return headers.map(({ text: headerText }: HeaderMetaData, index: number) => {
    const isFirstDataRowNumber = !isNaN(Number(trainTableData[0][index]));
    const isLastDataRowNumber = !isNaN(Number(trainTableData[Object.keys(trainTableData).length - 1][index]));
    if (isFirstDataRowNumber && isLastDataRowNumber) {
      return { text: headerText, type: 'number' };
    }
    return { text: headerText, type: 'string' };
  });
};

export const TableMetaDataReducer = (
  state: TableMetaDataState = initialState,
  action: TableMetaDataAction = initialAction,
): TableMetaDataState => {
  switch (action.type) {
    case TableMetaDataActionTypes.SET_HEADERS_WITH_TEXT: {
      const { headersRow } = action.payload;
      const newHeaders: HeadersMetaData = headersRow.map((headerText) => ({ text: headerText }));
      return { ...state, headers: newHeaders };
    }
    case TableMetaDataActionTypes.UPDATE_HEADERS_TYPES: {
      const newHeaders: HeadersMetaData = updateHeadersTypes(action.payload.trainTableData, state.headers);
      return { ...state, headers: newHeaders };
    }
    case TableMetaDataActionTypes.UPDATE_HEADER_TEXT: {
      const { columnIndex, newText } = action.payload;
      const newHeaders: HeadersMetaData = updateHeaderText(columnIndex, newText, state.headers);
      return { ...state, headers: newHeaders };
    }
    default:
      return state;
  }
};
