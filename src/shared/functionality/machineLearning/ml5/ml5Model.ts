import { ML5DataRow, ML5Library, ML5NeuralNet, ML5Result, NeuralNetworkTaskTypes } from '../../../types/ml5';
import { HeaderColumnType, HeaderMetaData, HeadersMetaData } from '../../../../state/tableMetaData/types';
import { JSONTableData } from '../../../types/JSONTableData';
import { TableRow } from '../../../types/tableContents';

declare let ml5: ML5Library;

// TO-DO Refactor to use internal API and have this class be static with utils
// can potentially used as an alternative to global redux
// this servers as a wrapper for ml5 neural net api
// core purpose is the boolean ability to check if the model is trained
export abstract class ML5Model {
  protected abstract typeOfNeuralNetworkTask: NeuralNetworkTaskTypes;

  private nn: ML5NeuralNet | null = null;

  public isTrained = false;

  private static getCellTextWithCorrectType(dataRow: TableRow, type: HeaderColumnType, columnIndex: number) {
    const inputText = dataRow[columnIndex];
    return type === 'number' ? Number(inputText) : inputText;
  }

  private static getML5InputRow(dataRow: TableRow, headers: Required<HeadersMetaData>): ML5DataRow {
    return headers
      .slice(0, headers.length - 1)
      .reduce((accumulator: ML5DataRow, headerMetaData: HeaderMetaData, columnIndex: number) => {
        const { text: headerText, type } = headerMetaData as Required<HeaderMetaData>;
        // TO-DO need to figure out when to convert and when to use as a class
        return { ...accumulator, [headerText]: ML5Model.getCellTextWithCorrectType(dataRow, type, columnIndex) };
      }, {});
  }

  protected addData(data: JSONTableData, headers: HeadersMetaData): void {
    const predictionItemIndex = headers.length - 1;
    const nameOfItemToPredict = headers[predictionItemIndex];
    Object.keys(data).forEach((rowIndex: string) => {
      const dataRow = data[Number(rowIndex)];
      const input = ML5Model.getML5InputRow(dataRow, headers);
      const output = { [nameOfItemToPredict.text]: dataRow[predictionItemIndex] };
      this.nn?.addData(input, output);
    });
  }

  private createNewNeuralNetwork(): void {
    this.nn = ml5.neuralNetwork({ task: this.typeOfNeuralNetworkTask });
  }

  // TO-DO - linter and compiler are not picking up errors
  public async train(data: JSONTableData, headers: HeadersMetaData): Promise<void> {
    // cannot simply retrain an alraday trained model with new data, hence need to initialize a new model
    this.createNewNeuralNetwork();
    return new Promise((resolve) => {
      // add data to the neural network
      this.addData(data, headers);

      // // normalize your data;
      this.nn?.normalizeData();

      // // train your neural network
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

  public async predict(data: JSONTableData, headers: HeadersMetaData): Promise<ML5Result> {
    return new Promise((resolve) => {
      const input: ML5DataRow = {};
      headers.forEach((headerMetaData: HeaderMetaData, columnIndex: number) => {
        // TO-DO need to figure out when to convert and when to use as a class
        const { text: headerText, type } = headerMetaData as Required<HeaderMetaData>;
        input[headerText] = ML5Model.getCellTextWithCorrectType(data[0], type, columnIndex);
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
