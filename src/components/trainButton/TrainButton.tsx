import { ML5 } from '../machineLearningButton/machineLearning/ml5';
import { store } from '../../state/store';

interface Props {
  modelClass: ML5;
}

export default function TrainButton(props: Props) {
  const { modelClass } = props;

  const triggerML = () => {
    const trainTable = store.getState().trainTable;
    modelClass.train(trainTable.data).then(() => {
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
