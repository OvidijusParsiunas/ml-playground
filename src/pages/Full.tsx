import { ML5ModelFactory } from '../shared/functionality/machineLearning/ml5/ml5ModelFactory';
import { ML5Model } from '../shared/functionality/machineLearning/ml5/ml5Model';
import { PredictTableActionTypes } from '../state/predictTable/consts';
import PredictButton from '../components/predictButton/PredictButton';
import { TrainTableActionTypes } from '../state/trainTable/consts';
import TrainButton from '../components/trainButton/TrainButton';
import StatefulTable from '../components/table/StatefulTable';
import Result from '../components/result/Result';
import React, { useEffect } from 'react';
import './full.css';

// TO-DO use slots for columns
export default function Full() {
  // the reason why these are not stored using Redux is because it is not best practice to store objects that contain
  // functions (classes or models), hence the better pattern is to store these in a parent component that uses them
  // const [models, setModels] = React.useState<ML5Model[]>([]);
  const [activeModel, setActiveModel] = React.useState<ML5Model | null>(null);

  useEffect(() => {
    setTimeout(() => {
      const ml5ClassificationModel = ML5ModelFactory.createClassification();
      // setModels([ml5ClassificationModel]);
      setActiveModel(ml5ClassificationModel);
      // TO-DO - will be replaced by state that signals when ml5 is imported
    }, 500);
  }, []);

  return (
    <div>
      <h1>Full</h1>
      <div className="container">
        <div className="content">
          <StatefulTable
            initialCSVDataPath="data/color.csv"
            updateTableDispatchAction={TrainTableActionTypes.UPDATE_TABLE}
            updateTableCellDispatchAction={TrainTableActionTypes.UPDATE_TABLE_CELL}
          />
        </div>
        <div className="content">
          <TrainButton model={activeModel} />
        </div>
        <div className="content">
          <StatefulTable
            initialCSVDataPath="data/predict.csv"
            updateTableDispatchAction={PredictTableActionTypes.UPDATE_TABLE}
            updateTableCellDispatchAction={PredictTableActionTypes.UPDATE_TABLE_CELL}
          />
        </div>
        <div className="content">
          <PredictButton model={activeModel} />
        </div>
        <div className="content">
          <Result />
        </div>
      </div>
    </div>
  );
}
