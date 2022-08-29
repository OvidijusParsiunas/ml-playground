import { TableContents, TableRow } from '../../shared/types/tableContents';
import { ParseCSVClipboardText } from './parseCSVClipboardText';
import { CSV } from '../../shared/types/CSV';
import React, { useState } from 'react';
import './table.css';

interface Props {
  headers?: string[];
  areHeadersEditable?: boolean;
  initialContent: TableContents;
  tableUpdated?: (table: TableContents) => void;
  cellUpdated?: (rowIndex: number, columnIndex: number, newText: string) => void;
}

export default function Table(props: Props) {
  const { headers, initialContent, areHeadersEditable, tableUpdated, cellUpdated } = props;

  const tableContents = React.useRef<TableContents>(JSON.parse(JSON.stringify(initialContent)));
  const [rerenderState, forceRerender] = useState<boolean>(false);

  const getCellPosition = (className: string) => {
    const digitsRegex = /\d+/g;
    const [rowIndex, columnIndex] = className.match(digitsRegex) || [0, 0];
    return [Number(rowIndex), Number(columnIndex)];
  };

  const fireCellUpdated = (rowIndex: number, columnIndex: number, cellText: string) => {
    if (cellUpdated) {
      cellUpdated(rowIndex, columnIndex, cellText);
    }
  };

  const fireTableUpdated = () => {
    if (tableUpdated) {
      // needs to be done for immutability
      // may not be efficient if table has many rows and updated frequently
      tableUpdated(JSON.parse(JSON.stringify(tableContents.current)));
    }
  };

  const updateCellText = (target: HTMLElement) => {
    const { className, textContent: cellText } = target;
    const [rowIndex, columnIndex] = getCellPosition(className);
    tableContents.current[rowIndex][columnIndex] = cellText as string;
    fireCellUpdated(rowIndex, columnIndex, cellText as string);
    fireTableUpdated();
  };

  const updateCellOnInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event) return;
    const nativeEvent = event.nativeEvent as unknown as { inputType: string };
    if (nativeEvent.inputType !== 'insertFromPaste') {
      updateCellText(event.target);
    }
  };

  // TO-DO create new rows/columns if index exceeds the current amount
  // TO-DO if prediction table - validate what is inserted, type and prevent the creation of new columns
  // (potentially highlight what is failing validation in red and display what the problem is upon hover)
  // training table may not be valid and the user may just want to predict with their model
  // which will only allow validation when an error is thrown, catch that error and display
  const updateCellsTextBasedOnCSV = (target: HTMLElement, CSV: CSV) => {
    const [targetCellRowIndex, targetCellColumnIndex] = getCellPosition(target.className);
    CSV.forEach((row: string[], rowIndex: number) => {
      row.forEach((cellText: string, columnIndex: number) => {
        tableContents.current[targetCellRowIndex + rowIndex][targetCellColumnIndex + columnIndex] = cellText;
        fireCellUpdated(rowIndex, columnIndex, cellText);
      });
    });
    fireTableUpdated();
    forceRerender(!rerenderState);
  };

  // TO-DO test with other hardware and software
  const updateCellsOnPaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
    const clipboardText = JSON.stringify(event.clipboardData.getData('text/plain'));
    if (clipboardText.indexOf('\\n') > -1 || clipboardText.indexOf('\\t') > -1) {
      event.preventDefault();
      const CSV = ParseCSVClipboardText.parse(clipboardText);
      updateCellsTextBasedOnCSV(event.target as HTMLElement, CSV);
    } else {
      updateCellText(event.target as HTMLElement);
    }
    return false;
  };

  const generateCells = (dataRow: TableRow, rowIndex: number, isHeader = false) => {
    const isContentEditable = isHeader ? areHeadersEditable : true;
    return dataRow.map((cellName: string, columnIndex: number) => {
      return (
        <div
          className={`row-${rowIndex}-column-${columnIndex} cell`}
          key={columnIndex}
          contentEditable={isContentEditable}
          onInput={updateCellOnInput}
          onPaste={updateCellsOnPaste}
          suppressContentEditableWarning={true}
        >
          {cellName}
        </div>
      );
    });
  };

  const populateDataRow = (dataRow: TableRow, rowIndex: number, isHeader = false): JSX.Element => {
    return (
      <div className="row" key={rowIndex}>
        {generateCells(dataRow, rowIndex, isHeader)}
      </div>
    );
  };

  const populateData = (data: TableContents): JSX.Element[] => {
    return data.map((dataRows: TableRow, rowIndex: number) => populateDataRow(dataRows, rowIndex + 1));
  };

  return (
    <div>
      {/* headers from parent state or this component */}
      <div id="header">{populateDataRow(headers || tableContents.current[0], 0, true)}</div>
      <div id="data">{populateData(tableContents.current.slice(1))}</div>
    </div>
  );
}

Table.defaultProps = {
  areHeadersEditable: true,
};
