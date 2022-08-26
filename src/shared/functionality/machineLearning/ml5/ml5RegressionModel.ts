import { NeuralNetworkTaskTypes } from '../../../types/ml5';
import { ML5Model } from './ml5Model';

// not tested
export class ML5RegressionModel extends ML5Model {
  protected readonly typeOfNeuralNetworkTask = NeuralNetworkTaskTypes.REGRESSION;
}
