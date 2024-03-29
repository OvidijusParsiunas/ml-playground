export type ML5DataRow = { [key: string]: string | number };
export type ML5Data = ML5DataRow[];

export type ML5Result = {
  label: string;
  confidence: number;
}[];

export enum NeuralNetworkTaskTypes {
  CLASSIFICATION = 'classification',
  REGRESSION = 'regression',
}

interface NeuralNetworkOptions {
  task: NeuralNetworkTaskTypes;
}

export type ML5NeuralNet = {
  addData: (input: ML5DataRow, output: ML5DataRow) => void;
  normalizeData: () => void;
  train: (
    trainingOptions: {
      epochs: number;
      batchSize: number;
    },
    finishCallback: () => void,
  ) => void;
  classify: (input: ML5DataRow, resultHandler: (error: Error, result: ML5Result) => void) => void;
  neuralNetwork: { isTrained: boolean };
};

export interface ML5Library {
  neuralNetwork: (options: NeuralNetworkOptions) => ML5NeuralNet;
}
