import { NeuralNetworkTaskTypes } from '../../../types/ml5';
import { ML5Model } from './ml5Model';

// TO-DO can just have this in the actual class constructor and the extended class may not be necessary
export class ML5ClassificationModel extends ML5Model {
  protected readonly typeOfNeuralNetworkTask = NeuralNetworkTaskTypes.CLASSIFICATION;
}
