import { ML5 } from '../machineLearningButton/machineLearning/ml5';
import { setResult } from '../../state/result/actions';
import { ML5Result } from '../../shared/types/ml5';
import { useDispatch } from 'react-redux';
import { store } from '../../state/store';

interface Props {
  modelClass: ML5;
}

export default function PredictButton(props: Props) {
  const { modelClass } = props;

  const dispatch = useDispatch();

  const parseResult = (result: ML5Result) => {
    let highestResult = { confidence: 0, label: '' };
    result.forEach((resultItem) => {
      if (resultItem.confidence > highestResult.confidence) highestResult = resultItem;
    });
    return highestResult.label;
  };

  const triggerML = () => {
    if (!modelClass.isTrained) return;
    const predictTable = store.getState().predictTable;
    modelClass.predict(predictTable.data).then((result) => {
      const highestResult = parseResult(result);
      dispatch(setResult(highestResult));
    });
  };

  return (
    <div>
      <button style={{ backgroundColor: '#6dffad' }} onClick={triggerML}>
        Predict
      </button>
    </div>
  );
}
