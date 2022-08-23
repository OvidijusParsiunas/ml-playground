import { ML5ModelWrapper } from '../../shared/functionality/machineLearning/ml5/ml5';
import { ModelActionTypes } from './consts';
import { ModelAction } from './types';

export const setModel = (model: ML5ModelWrapper): ModelAction => ({
  type: ModelActionTypes.SET_MODEL,
  payload: { model },
});
