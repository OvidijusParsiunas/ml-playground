import { ML5ModelFactory } from '../shared/functionality/machineLearning/ml5/ml5ModelFactory';
import { ML5ModelWrapper } from '../shared/functionality/machineLearning/ml5/ml5';
import PredictButton from '../components/predictButton/PredictButton';
import PredictTable from '../components/predictTable/PredictTable';
import TrainButton from '../components/trainButton/TrainButton';
import TrainTable from '../components/trainTable/TrainTable';
import Result from '../components/result/Result';
import React, { useEffect } from 'react';
import './full.css';

// TO-DO use slots for columns
export default function Full() {
  // the reason why these are not stored using Redux is because it is not best practice to store objects that contain
  // functions (classes or models), hence the better pattern is to store these in a parent component that uses them
  const [models, setModels] = React.useState<ML5ModelWrapper[]>([]);
  const [activeModel, setActiveModel] = React.useState<ML5ModelWrapper | null>(null);

  useEffect(() => {
    setTimeout(() => {
      const ml5ClassificationModel = ML5ModelFactory.createClassification();
      setModels([ml5ClassificationModel]);
      setActiveModel(ml5ClassificationModel);
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
          <TrainButton modelWrapper={activeModel} />
        </div>
        <div className="content">
          <PredictTable />
        </div>
        <div className="content">
          <PredictButton modelWrapper={activeModel} />
        </div>
        <div className="content">
          <Result />
        </div>
      </div>
    </div>
  );
}
