import { ML5ClassificationModel } from './ml5ClassificationModel';
import { ML5Model } from './ml5Model';

export class ML5ModelFactory {
  public static createClassification(): ML5Model {
    return new ML5ClassificationModel();
  }
}
