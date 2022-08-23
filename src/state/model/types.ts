import { ML5 } from '../../components/machineLearningButton/machineLearning/ml5';
import { ModelActionTypes } from './consts';

type SetModelAction = { type: ModelActionTypes.SET_MODEL; payload: { model: ModelState['model'] } };

export type ModelAction = SetModelAction;

export interface ModelState {
  model: ML5 | null;
}
