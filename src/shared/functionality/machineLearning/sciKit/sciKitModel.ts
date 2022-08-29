import { JSONTableData } from '../../../types/JSONTableData';
import { TableHeaders } from '../../../types/tableHeader';
import { LinearRegression, setBackend } from 'scikitjs';
import * as tf from '@tensorflow/tfjs';
setBackend(tf);

// TO-DO Refactor to use internal API such as the csv to json function inside the model
// this servers as a wrapper for ml5 neural net api
export class SciKitModel {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private nn: any = null;

  public isModelTrained(): boolean {
    return true;
  }

  private addData(data: JSONTableData, headers: TableHeaders): void {
    // const predictionItemIndex = headers.length - 1;
    // const nameOfItemToPredict = headers[predictionItemIndex];
    // Object.keys(data).forEach((rowIndex: string) => {
    //   const dataRow = data[Number(rowIndex)];
    //   const input = ML5Model.getML5InputRow(dataRow, headers);
    //   const output = { [nameOfItemToPredict.text]: dataRow[predictionItemIndex] };
    //   this.nn?.addData(input, output);
    // });
  }

  private createNewNeuralNetwork(): void {
    // this.nn = ml5.neuralNetwork({ task: this.typeOfNeuralNetworkTask });
  }

  // TO-DO - linter and compiler are not picking up errors
  public async train(): Promise<void> {
    const X = [
      [2, 3],
      [1, 4],
      [5, 7],
    ];
    const y = [10, 14, 20];

    this.nn = new LinearRegression();
    await this.nn.fit(X, y);
    const result = this.nn.predict([[5, 7]]).arraySync();
    console.log(result);
  }

  private finishTraining(resolve: () => void): void {
    resolve();
  }

  public predict(): void {
    const result = this.nn.predict([2, 3]);
    console.log(result);
  }
}
