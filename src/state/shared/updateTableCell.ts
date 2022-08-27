import { JSONTableData } from '../../shared/types/JSONTableData';

export class UpdateTableCell {
  // prettier-ignore
  public static getNewRow(
      rowIndex: number, columnIndex: number, newText: string,
      currentState: JSONTableData, doesTableStateContainHeaders = true): JSONTableData {
    const rowIndexToUpdate = doesTableStateContainHeaders ? rowIndex : rowIndex - 1;
    const row = JSON.parse(JSON.stringify(currentState[rowIndexToUpdate]));
    row[columnIndex] = newText;
    return { [rowIndexToUpdate]: row };
  }
}
