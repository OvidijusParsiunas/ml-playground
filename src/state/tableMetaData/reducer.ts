import { TableMetaDataAction, TableMetaDataState } from './types';
import { TableMetaDataActionTypes } from './consts';

const initialState: TableMetaDataState = {
  headers: [],
};

const initialAction: TableMetaDataAction = {
  type: TableMetaDataActionTypes.SET_HEADERS_META_DATA,
  payload: { headers: initialState.headers },
};

export const TableMetaDataReducer = (
  state: TableMetaDataState = initialState,
  action: TableMetaDataAction = initialAction,
): TableMetaDataState => {
  switch (action.type) {
    case TableMetaDataActionTypes.SET_HEADERS_META_DATA: {
      return { ...state, headers: action.payload.headers };
    }
    default:
      return state;
  }
};
