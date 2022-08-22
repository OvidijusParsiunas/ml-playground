// import { ML5 } from './machineLearning/ml5';

export default function TrainButton() {
  const triggerML = () => {
    console.log('training');
  };
  return (
    <div>
      <button style={{ backgroundColor: '#6dffad' }} onClick={triggerML}>
        Train
      </button>
    </div>
  );
}
