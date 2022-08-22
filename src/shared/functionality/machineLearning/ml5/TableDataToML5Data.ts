import { ML5Data, ML5DataRow } from '../../../types/ml5';
import { TableData } from '../../../types/tableData';

export class TableDataToML5Data {
  public static convert(reactTable: TableData): ML5Data {
    const ml5Data: ML5Data = [];
    reactTable.data.forEach((dataRow: string[]) => {
      const ml5DataRow: ML5DataRow = {};
      reactTable.header.forEach((headerCell: string, index: number) => {
        // ml5DataRow[headerCell] = dataRow[index];
      });
      ml5Data.push(ml5DataRow);
    });
    return ml5Data;
  }
}
