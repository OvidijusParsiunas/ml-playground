import { ML5Model } from '../../shared/functionality/machineLearning/ml5/ml5Model';
import { setPredictTableHeaders } from '../../state/predictTable/actions';
import { JSONTableContents } from '../../shared/types/JSONTableContents';
import { HeadersMetaData } from '../../state/tableMetaData/types';
import { useDispatch } from 'react-redux';
import { store } from '../../state/store';

interface Props {
  model: ML5Model | null;
}

const generateHeadersMetaData = (trainTable: JSONTableContents): HeadersMetaData => {
  return trainTable[0].map((headerText: string, index: number) => {
    const isFirstDataRowNumber = !isNaN(Number(trainTable[1][index]));
    const isLastDataRowNumber = !isNaN(Number(trainTable[Object.keys(trainTable).length - 1][index]));
    if (isFirstDataRowNumber && isLastDataRowNumber) {
      return { text: headerText, type: 'number' };
    }
    return { text: headerText, type: 'string' };
  });
};

export default function TrainButton(props: Props) {
  const { model } = props;

  const dispatch = useDispatch();

  const triggerML = () => {
    const trainTableData = store.getState().trainTable;
    const newHeaders = generateHeadersMetaData(trainTableData);
    model?.train(trainTableData, newHeaders).then(() => {
      console.log('Training finished!');
      dispatch(setPredictTableHeaders(newHeaders.slice(0, newHeaders.length - 1)));
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
