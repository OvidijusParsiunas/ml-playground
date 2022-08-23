import { ML5Library, ML5Model } from '../../../types/ml5';
import { ML5ModelWrapper } from './ml5';

declare let ml5: ML5Library;

// not tested
export class ML5RegressionModel extends ML5ModelWrapper {
  private readonly options = { task: 'regression' };

  protected nn: ML5Model = ml5.neuralNetwork(this.options);
}
