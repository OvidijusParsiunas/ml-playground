import { ML5Model } from '../../shared/functionality/machineLearning/ml5/ml5Model';
import { store } from '../../state/store';

interface Props {
  model: ML5Model | null;
}

export default function TrainButton(props: Props) {
  const { model } = props;

  const triggerML = () => {
    const trainTable = store.getState().trainTable;
    model?.train(trainTable.data).then(() => {
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
