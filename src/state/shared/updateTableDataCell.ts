import { JSONTableData } from '../../shared/types/JSONTableData';

export class UpdateTaleDataCell {
  // prettier-ignore
  public static getNewRow(
      rowIndex: number, columnIndex: number, newText: string, currentState: JSONTableData): JSONTableData {
    const row = JSON.parse(JSON.stringify(currentState[rowIndex - 1]));
    row[columnIndex] = newText;
    return { [rowIndex - 1]: row };
  }
}
