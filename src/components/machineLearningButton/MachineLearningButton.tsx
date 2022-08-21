import { ML5 } from './machineLearning/ml5';

export default function MachineLearningButton() {
  const triggerML = () => ML5.run();
  return (
    <div>
      <button style={{ backgroundColor: '#6dffad' }} onClick={triggerML}>
        Start
      </button>
    </div>
  );
}
