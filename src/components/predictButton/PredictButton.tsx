import { ML5ModelWrapper } from '../../shared/functionality/machineLearning/ml5/ml5';
import { setResult } from '../../state/result/actions';
import { ML5Result } from '../../shared/types/ml5';
import { useDispatch } from 'react-redux';
import { store } from '../../state/store';

interface Props {
  modelWrapper: ML5ModelWrapper | null;
}

export default function PredictButton(props: Props) {
  const { modelWrapper } = props;

  const dispatch = useDispatch();

  const parseResult = (result: ML5Result) => {
    let highestResult = { confidence: 0, label: '' };
    result.forEach((resultItem) => {
      if (resultItem.confidence > highestResult.confidence) highestResult = resultItem;
    });
    return highestResult.label;
  };

  const triggerML = () => {
    const predictTable = store.getState().predictTable;
    modelWrapper?.predict(predictTable.data).then((result) => {
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
