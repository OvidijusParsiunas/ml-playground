import { TableContents, TableRow } from '../../shared/types/tableContents';
import React from 'react';
import './table.css';

interface Props {
  initialContent: TableContents;
  tableUpdated?: (table: TableContents) => void;
  cellUpdated?: (rowIndex: number, columnIndex: number, newText: string) => void;
}

export default function Table(props: Props) {
  const { initialContent, tableUpdated, cellUpdated } = props;

  const tableContents = React.useRef<TableContents>(JSON.parse(JSON.stringify(initialContent)));

  const getCellPosition = (className: string) => {
    const digitsRegex = /\d+/g;
    const [rowIndex, columnIndex] = className.match(digitsRegex) || [0, 0];
    return [Number(rowIndex), Number(columnIndex)];
  };

  const updateCell = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event) return;
    const { className, textContent: cellText } = event.target;
    const [rowIndex, columnIndex] = getCellPosition(className);
    tableContents.current[rowIndex][columnIndex] = cellText as string;
    if (tableUpdated) {
      // needs to be done for immutability
      // may not be efficient if table has many rows and updated frequently
      tableUpdated(JSON.parse(JSON.stringify(tableContents.current)));
    }
    if (cellUpdated) {
      cellUpdated(rowIndex, columnIndex, cellText as string);
    }
  };

  const generateCells = (dataRow: TableRow, rowIndex: number) => {
    return dataRow.map((cellName: string, columnIndex: number) => {
      return (
        <div
          className={`row-${rowIndex}-column-${columnIndex} cell`}
          key={columnIndex}
          contentEditable
          onInput={updateCell}
          suppressContentEditableWarning={true}
        >
          {cellName}
        </div>
      );
    });
  };

  const populateDataRow = (dataRow: TableRow, rowIndex: number): JSX.Element => {
    return (
      <div className="row" key={rowIndex}>
        {generateCells(dataRow, rowIndex)}
      </div>
    );
  };

  const populateData = (data: TableContents): JSX.Element[] => {
    return data.map((dataRows: TableRow, rowIndex: number) => populateDataRow(dataRows, rowIndex + 1));
  };

  return (
    <div>
      <div id="header">{populateDataRow(tableContents.current[0], 0)}</div>
      <div id="data">{populateData(tableContents.current.slice(1))}</div>
    </div>
  );
}
