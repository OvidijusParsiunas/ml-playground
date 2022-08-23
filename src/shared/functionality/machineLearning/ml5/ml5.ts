import { ML5DataRow, ML5Model, ML5Result } from '../../../types/ml5';
import { TableData } from '../../../types/tableData';

export abstract class ML5ModelWrapper {
  protected abstract nn: ML5Model;

  public isTrained = false;

  protected addData(data: TableData): void {
    const nameOfItemToPredict = data.header[data.header.length - 1];
    const predictionItemIndex = data.header.length - 1;
    data.data.forEach((dataRow: string[]) => {
      const input: ML5DataRow = {};
      data.header.forEach((headerCell: string, index: number) => {
        if (index < data.header.length - 1) {
          input[headerCell] = dataRow[index];
        }
      });
      const output = { [nameOfItemToPredict]: dataRow[predictionItemIndex] };
      this.nn?.addData(input, output);
    });
  }

  public async train(data: TableData): Promise<void> {
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

  public async predict(data: TableData): Promise<ML5Result> {
    return new Promise((resolve) => {
      const input: ML5DataRow = {};
      data.header.forEach((headerCell: string, index: number) => {
        input[headerCell] = data.data[0][index];
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
