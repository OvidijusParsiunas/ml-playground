import { ML5Library, ML5Model } from '../../../types/ml5';
import { ML5ModelWrapper } from './ml5';

declare let ml5: ML5Library;

// regression and classification based problems
export class ML5ClassificationModel extends ML5ModelWrapper {
  private readonly options = { task: 'classification' };

  protected nn: ML5Model = ml5.neuralNetwork(this.options);
}
