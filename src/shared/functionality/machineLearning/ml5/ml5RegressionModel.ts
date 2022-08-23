import { ML5Library, ML5NeuralNet } from '../../../types/ml5';
import { ML5Model } from './ml5Model';

declare let ml5: ML5Library;

// not tested
export class ML5RegressionModel extends ML5Model {
  private readonly options = { task: 'regression' };

  protected nn: ML5NeuralNet = ml5.neuralNetwork(this.options);
}
