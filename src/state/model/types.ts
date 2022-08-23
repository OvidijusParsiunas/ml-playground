import { ML5Model } from '../../shared/functionality/machineLearning/ml5/ml5Model';
import { ModelActionTypes } from './consts';

type SetModelAction = { type: ModelActionTypes.SET_MODEL; payload: { model: ModelState['model'] } };

export type ModelAction = SetModelAction;

export interface ModelState {
  model: ML5Model | null;
}
