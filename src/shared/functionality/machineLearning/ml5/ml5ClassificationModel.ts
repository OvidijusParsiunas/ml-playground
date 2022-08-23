import { ML5Library, ML5NeuralNet } from '../../../types/ml5';
import { ML5Model } from './ml5Model';

declare let ml5: ML5Library;

// regression and classification based problems
export class ML5ClassificationModel extends ML5Model {
  private readonly options = { task: 'classification' };

  protected nn: ML5NeuralNet = ml5.neuralNetwork(this.options);
}
