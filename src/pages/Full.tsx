import { ML5 } from '../components/machineLearningButton/machineLearning/ml5';
import PredictButton from '../components/predictButton/PredictButton';
import PredictTable from '../components/predictTable/PredictTable';
import TrainButton from '../components/trainButton/TrainButton';
import TrainTable from '../components/trainTable/TrainTable';
import Result from '../components/result/Result';
import React, { useEffect } from 'react';
import './full.css';

// TO-DO use slots for columns
export default function Full() {
  const [model] = React.useState<ML5>(new ML5());

  useEffect(() => {
    setTimeout(() => {
      model.create();
      // TO-DO - will be replaced by state that signals when ml5 is imported
    }, 500);
  }, []);

  return (
    <div>
      <h1>Full</h1>
      <div className="container">
        <div className="content">
          <TrainTable />
        </div>
        <div className="content">
          <TrainButton modelClass={model} />
        </div>
        <div className="content">
          <PredictTable />
        </div>
        <div className="content">
          <PredictButton modelClass={model} />
        </div>
        <div className="content">
          <Result />
        </div>
      </div>
    </div>
  );
}
