import { ML5 } from '../../components/machineLearningButton/machineLearning/ml5';
import { ModelActionTypes } from './consts';
import { ModelAction } from './types';

export const setModel = (model: ML5): ModelAction => ({
  type: ModelActionTypes.SET_MODEL,
  payload: { model },
});
