import { ML5ClassificationModel } from './ml5ClassificationModel';
import { ML5ModelWrapper } from './ml5';

export class ML5ModelFactory {
  public static createClassification(): ML5ModelWrapper {
    return new ML5ClassificationModel();
  }
}
