import { ML5Model } from '../../shared/functionality/machineLearning/ml5/ml5Model';
import { TableHeader, TableHeaders } from '../../shared/types/tableHeader';
import { setPredictTableHeaders } from '../../state/predictTable/actions';
import { TrainTableState } from '../../state/trainTable/types';
import { useDispatch } from 'react-redux';
import { store } from '../../state/store';

interface Props {
  model: ML5Model | null;
}

const generateTableHeadersWithTypes = ({ headers, data }: TrainTableState): TableHeaders => {
  return headers.map(({ text }: TableHeader, index: number) => {
    const isFirstDataRowNumber = !isNaN(Number(data[1][index]));
    const isLastDataRowNumber = !isNaN(Number(data[Object.keys(data).length - 1][index]));
    if (isFirstDataRowNumber && isLastDataRowNumber) {
      return { text, type: 'number' };
    }
    return { text, type: 'string' };
  });
};

export default function TrainButton(props: Props) {
  const { model } = props;

  const dispatch = useDispatch();

  const triggerML = () => {
    const trainTableState = store.getState().trainTable;
    const predictTableHeaders = generateTableHeadersWithTypes(trainTableState);
    model?.train(trainTableState.data, predictTableHeaders).then(() => {
      console.log('Training finished!');
      dispatch(setPredictTableHeaders(predictTableHeaders.slice(0, predictTableHeaders.length - 1)));
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
