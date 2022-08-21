import { ReactTableColumns, ReactTableRow, ReactTableData, ReactTable } from '../../types/reactTableData';
import { CSVData, CSVDataRow } from '../../types/CSVData';

export class CSVDataToReactTableData {
  private static getColumns(CSVHeaderRow: CSVDataRow): ReactTableColumns {
    const columns: ReactTableColumns = [];
    CSVHeaderRow.forEach((headerCell: string) => {
      columns.push({ name: headerCell, selector: (row: ReactTableRow) => row[headerCell] });
    });
    return columns;
  }

  private static getData(CSVHeaderRow: CSVDataRow, CSVDataRows: CSVData): ReactTableData {
    const data: ReactTableData = [];
    // TO-DO - use map
    CSVDataRows.forEach((dataRow: string[]) => {
      const tableDataRow: ReactTableRow = {};
      CSVHeaderRow.forEach((headerCell: string, index: number) => {
        // not sure if the below is needed, if so - change type
        // tableDataRow.id = rowIndex + 1;
        tableDataRow[headerCell] = dataRow[index];
      });
      data.push(tableDataRow);
    });
    return data;
  }

  public static convert(CSVData: CSVData): ReactTable {
    const CSVHeaderRow = CSVData[0];
    const CSVDataRows = CSVData.slice(1);
    return {
      columns: CSVDataToReactTableData.getColumns(CSVHeaderRow),
      data: CSVDataToReactTableData.getData(CSVHeaderRow, CSVDataRows),
    };
  }
}
