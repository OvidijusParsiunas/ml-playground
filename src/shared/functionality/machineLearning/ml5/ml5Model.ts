import { ML5DataRow, ML5NeuralNet, ML5Result } from '../../../types/ml5';
import { TableRow } from '../../../types/TableContents';
import { JSONTable } from '../../../types/JSONTable';

// this servers as a wrapper for ml5 neural net api
// core purpose is the boolean ability to check if the model is trained
export abstract class ML5Model {
  protected abstract nn: ML5NeuralNet;

  public isTrained = false;

  private getML5DataRow(table: JSONTable, headerRow: TableRow, dataRow: TableRow): ML5DataRow {
    return headerRow.reduce((accumulator: ML5DataRow, headerCell: string, index: number) => {
      if (index < headerRow.length - 1) {
        return { ...accumulator, [headerCell]: dataRow[index] };
      }
      return accumulator;
    }, {});
  }

  protected addData(table: JSONTable): void {
    const headerRow = table[0];
    const predictionItemIndex = headerRow.length - 1;
    const nameOfItemToPredict = headerRow[predictionItemIndex];
    Object.keys(table).forEach((rowIndex: string) => {
      if (Number(rowIndex) === 0) return;
      const dataRow = table[Number(rowIndex)];
      const input = this.getML5DataRow(table, headerRow, dataRow);
      const output = { [nameOfItemToPredict]: dataRow[predictionItemIndex] };
      this.nn?.addData(input, output);
    });
  }

  public async train(data: JSONTable): Promise<void> {
    return new Promise((resolve) => {
      // add data to the neural network
      this.addData(data);

      // normalize your data;
      this.nn?.normalizeData();

      // train your neural network
      const trainingOptions = {
        epochs: 32,
        batchSize: 12,
      };

      this.nn?.train(trainingOptions, this.finishTraining.bind(this, resolve));
    });
  }

  private finishTraining(resolve: () => void): void {
    resolve();
    this.isTrained = true;
  }

  public async predict(table: JSONTable): Promise<ML5Result> {
    return new Promise((resolve) => {
      const input: ML5DataRow = {};
      const headerRow = table[0];
      headerRow.forEach((headerCell: string, index: number) => {
        input[headerCell] = table[1][index];
      });
      this.nn?.classify(input, handleResults);

      // define a function to handle the results of your classification
      function handleResults(error: Error, result: ML5Result) {
        if (error) {
          console.error(error);
          return;
        }
        resolve(result);
      }
    });
  }
}
