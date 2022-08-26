import { ML5Model } from '../../shared/functionality/machineLearning/ml5/ml5Model';
import { updateHeadersTypes } from '../../state/tableMetaData/actions';
import { useDispatch } from 'react-redux';
import { store } from '../../state/store';

interface Props {
  model: ML5Model | null;
}

export default function TrainButton(props: Props) {
  const { model } = props;

  const dispatch = useDispatch();

  const triggerML = () => {
    const trainTableData = store.getState().trainTableData;
    dispatch(updateHeadersTypes(trainTableData));
    const newHeaders = store.getState().tableMetaData.headers;
    model?.train(trainTableData, newHeaders).then(() => {
      console.log('Training finished');
    });
  };

  return (
    <div>
      <button style={{ backgroundColor: '#6dffad' }} onClick={triggerML}>
        Train
      </button>
    </div>
  );
}
