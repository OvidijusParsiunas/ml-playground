import { RootReducer } from '../../state/rootReducer';
import { useSelector } from 'react-redux';

export default function Result() {
  const result = useSelector<RootReducer, RootReducer['result']>((state) => state.result);

  return <div style={{ width: 50 }}>{result.result}</div>;
}
