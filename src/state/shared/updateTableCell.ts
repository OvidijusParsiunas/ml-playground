import { TableHeader, TableHeaders } from '../../shared/types/tableHeader';
import { JSONTableData } from '../../shared/types/JSONTableData';

export class UpdateTableCell {
  // prettier-ignore
  public static getUpdatedRowWithNewText(
      rowIndex: number, columnIndex: number, newText: string, currentState: JSONTableData): JSONTableData {
    const row = JSON.parse(JSON.stringify(currentState[rowIndex - 1]));
    row[columnIndex] = newText;
    return { [rowIndex - 1]: row };
  }

  public static getUpdatedHeadersWithNewText(columnIndex: number, newText: string, headers: TableHeaders): TableHeaders {
    return headers.map((header: TableHeader, index: number) => {
      if (columnIndex === index) {
        return { text: newText, type: header.type };
      }
      return { ...header };
    });
  }
}
