import { ML5ModelWrapper } from '../../shared/functionality/machineLearning/ml5/ml5';
import { store } from '../../state/store';

interface Props {
  modelWrapper: ML5ModelWrapper | null;
}

export default function TrainButton(props: Props) {
  const { modelWrapper } = props;

  const triggerML = () => {
    const trainTable = store.getState().trainTable;
    modelWrapper?.train(trainTable.data).then(() => {
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
