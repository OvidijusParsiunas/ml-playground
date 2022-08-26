import { ML5Model } from '../../shared/functionality/machineLearning/ml5/ml5Model';
import { setHeadersMetaData } from '../../state/tableMetaData/actions';
import { HeadersMetaData } from '../../state/tableMetaData/types';
import { JSONTable } from '../../shared/types/JSONTable';
import { useDispatch } from 'react-redux';
import { store } from '../../state/store';

interface Props {
  model: ML5Model | null;
}

export default function TrainButton(props: Props) {
  const { model } = props;

  const dispatch = useDispatch();

  const generateHeadersMetaData = (JSONTable: JSONTable): HeadersMetaData => {
    const headers = JSONTable[0];
    return headers.map((headerText: string, index: number) => {
      const isFirstDataRowNumber = !isNaN(Number(JSONTable[1][index]));
      const isLastDataRowNumber = !isNaN(Number(JSONTable[Object.keys(JSONTable).length - 1][index]));
      if (isFirstDataRowNumber && isLastDataRowNumber) {
        return { text: headerText, type: 'number' };
      }
      return { text: headerText, type: 'string' };
    });
  };

  const triggerML = () => {
    const trainTable = store.getState().trainTable;
    const headers = generateHeadersMetaData(trainTable);
    dispatch(setHeadersMetaData(headers));
    model?.train(trainTable, headers).then(() => {
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
