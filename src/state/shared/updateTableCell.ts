import { JSONTableContents } from '../../shared/types/JSONTableContents';

export class UpdateTableCell {
  // prettier-ignore
  public static getNewRow(
      rowIndex: number, columnIndex: number, newText: string,
      currentState: JSONTableContents, doesTableStateContainHeaders = true): JSONTableContents {
    const rowIndexToUpdate = doesTableStateContainHeaders ? rowIndex : rowIndex - 1;
    const row = JSON.parse(JSON.stringify(currentState[rowIndexToUpdate]));
    row[columnIndex] = newText;
    return { [rowIndexToUpdate]: row };
  }
}
