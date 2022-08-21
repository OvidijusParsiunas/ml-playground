import { TableProps } from 'react-data-table-component';

export type ReactTableColumns = ReactTable['columns'];
export type ReactTableData = ReactTable['data'];
export type ReactTableRow = { [key: string]: string };
export type ReactTable = TableProps<ReactTableRow>;
