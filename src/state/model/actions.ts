import { ML5Model } from '../../shared/functionality/machineLearning/ml5/ml5Model';
import { ModelActionTypes } from './consts';
import { ModelAction } from './types';

export const setModel = (model: ML5Model): ModelAction => ({
  type: ModelActionTypes.SET_MODEL,
  payload: { model },
});
