// import { useEffect } from 'react';
import { TableData } from '../../shared/types/tableData';
import './table.css';

export default function Table(props: TableData) {
  const { header, data } = props;

  const generateCells = (dataRow: string[]): JSX.Element[] => {
    return dataRow.map((cellName: string, index: number) => <div key={index}>{cellName}</div>);
  };

  const populateDataRow = (dataRow: string[], rowKey = 0): JSX.Element => {
    return (
      <div className="row" key={rowKey}>
        {generateCells(dataRow)}
      </div>
    );
  };

  const populateData = (data: string[][]): JSX.Element[] => {
    return data.map((dataRows: string[], rowIndex: number) => populateDataRow(dataRows, rowIndex));
  };

  // useEffect(() => {
  //   console.log('columns change');
  // }, columns);

  // useEffect(() => {
  //   console.log('data change');
  // }, data);

  return (
    <div>
      <div id="header">{populateDataRow(header)}</div>
      <div id="data">{populateData(data)}</div>
    </div>
  );
}
