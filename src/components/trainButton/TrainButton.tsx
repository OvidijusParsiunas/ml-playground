import { ML5 } from '../machineLearningButton/machineLearning/ml5';
import { store } from '../../state/store';

export default function TrainButton() {
  const triggerML = () => {
    const trainTable = store.getState().trainTable;
    ML5.run(trainTable.data);
  };

  return (
    <div>
      <button style={{ backgroundColor: '#6dffad' }} onClick={triggerML}>
        Train
      </button>
    </div>
  );
}
