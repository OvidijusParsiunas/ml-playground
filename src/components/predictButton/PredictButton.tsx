import { ML5Model } from '../../shared/functionality/machineLearning/ml5/ml5Model';
import { setResult } from '../../state/result/actions';
import { ML5Result } from '../../shared/types/ml5';
import { useDispatch } from 'react-redux';
import { store } from '../../state/store';

interface Props {
  model: ML5Model | null;
}

export default function PredictButton(props: Props) {
  const { model } = props;

  const dispatch = useDispatch();

  const parseResult = (result: ML5Result) => {
    let highestResult = { confidence: 0, label: '' };
    result.forEach((resultItem) => {
      if (resultItem.confidence > highestResult.confidence) highestResult = resultItem;
    });
    return highestResult.label;
  };

  const triggerML = () => {
    if (!model?.isModelTrained()) return;
    const predictTableData = store.getState().predictTableData;
    const headers = store.getState().tableMetaData.headers;
    model?.predict(predictTableData, headers).then((result) => {
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
