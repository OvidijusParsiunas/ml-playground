import { TableData } from '../../../shared/types/tableData';
import { ML5DataRow } from '../../../shared/types/ml5';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let ml5: any;

// regression and classification based problems
export class ML5 {
  public static addData(data: TableData, nn: { addData: (input: ML5DataRow, output: ML5DataRow) => void }): void {
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
      nn.addData(input, output);
    });
  }

  public static run(data: TableData): void {
    // set your neural network options
    const options = {
      task: 'classification',
    };

    // initialize your neural network
    const nn = ml5.neuralNetwork(options);

    // add data to the neural network
    ML5.addData(data, nn);

    // normalize your data;
    nn.normalizeData();

    // train your neural network
    const trainingOptions = {
      epochs: 32,
      batchSize: 12,
    };
    nn.train(trainingOptions, finishedTraining);

    // use the trained model
    function finishedTraining() {
      classify();
    }

    // make a classification
    function classify() {
      const input = {
        R: '255',
        G: '0',
        B: '0',
      };
      nn.classify(input, handleResults);
    }

    // define a function to handle the results of your classification
    function handleResults(error: Error, result: string) {
      if (error) {
        console.error(error);
        return;
      }
      console.log(result); // {label: 'red', confidence: 0.8};
    }
  }
}
