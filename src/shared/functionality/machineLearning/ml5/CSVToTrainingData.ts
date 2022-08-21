import { ML5Data, ML5DataRow } from '../../../types/ml5';
import { CSVData } from '../../../types/CSVData';

export class CSVToTrainingData {
  public static convert(CSVData: CSVData): ML5Data {
    const ml5Data: ML5Data = [];
    const CSVHeaderRow = CSVData[0];
    const CSVDataRows = CSVData.slice(1);
    // TO-DO - use map
    CSVDataRows.forEach((dataRow: string[]) => {
      const ml5DataRow: ML5DataRow = {};
      CSVHeaderRow.forEach((headerCell: string, index: number) => {
        ml5DataRow[headerCell] = dataRow[index];
      });
      ml5Data.push(ml5DataRow);
    });
    return ml5Data;
  }
}
