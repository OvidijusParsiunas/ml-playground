import { TableContents, TableRow } from '../../shared/types/tableContents';
import { ParseCSVClipboardText } from './parseCSVClipboardText';
import React, { useEffect, useState } from 'react';
import { CSV } from '../../shared/types/CSV';
import './table.css';

// TO-DO
// API needs to provide the ability to style borders
// allow duplicate headers, if not, how to default
interface Props {
  headers?: string[];
  defaultValue?: string;
  areHeadersEditable?: boolean;
  initialContent: TableContents;
  tableUpdated?: (table: TableContents) => void;
  cellUpdated?: (rowIndex: number, columnIndex: number, newText: string) => void;
}

// TO-DO Column names cannot be the same
export default function Table(props: Props) {
  const { headers, defaultValue, initialContent, areHeadersEditable, tableUpdated, cellUpdated } = props;
  const defaultValueClassName = 'default-value';
  const defaultColumnWidth = '100px';

  const tableContents = React.useRef<TableContents>(JSON.parse(JSON.stringify(initialContent)));
  const [rerenderState, forceRerender] = useState<boolean>(false);
  // can use typescript template inferance
  const headerState = React.useRef<{ width: string; text: string }[]>([]);

  const getNumberOfIdenticalHeaderText = (targetHeaderText: string, arraySearchEndIndex?: number) => {
    const endIndex = arraySearchEndIndex === undefined ? headerState.current.length : arraySearchEndIndex;
    return headerState.current.slice(0, endIndex).filter((headerCell) => headerCell.text === targetHeaderText).length;
  };

  const setHeaderState = () => {
    let isHeaderTextUpdated = false;
    initialContent[0].forEach((headerText: string, index: number) => {
      let newText = headerText;
      if (getNumberOfIdenticalHeaderText(headerText, index) > 0) {
        newText = defaultValue || '';
        tableContents.current[0][index] = newText;
        fireCellUpdated(0, index, defaultValue as string);
        isHeaderTextUpdated = true;
      }
      headerState.current.push({ text: newText, width: defaultColumnWidth });
    });
    return isHeaderTextUpdated;
  };

  useEffect(() => {
    fireTableUpdated();
    const isHeaderTextUpdated = setHeaderState();
    if (isHeaderTextUpdated) {
      fireTableUpdated();
      forceRerender(!rerenderState);
    }
  }, [initialContent]);

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

  const addNewRow = () => {
    const numberOfColumns = tableContents.current[0].length;
    const newRow = new Array(numberOfColumns).fill(defaultValue);
    tableContents.current.push(newRow);
    newRow.forEach((cellText: string, columnIndex: number) => {
      fireCellUpdated(tableContents.current.length - 1, columnIndex, cellText as string);
    });
    fireTableUpdated();
    forceRerender(!rerenderState);
  };

  const updateCellText = (target: HTMLElement) => {
    const { className, textContent } = target;
    const cellText = textContent as string;
    const [rowIndex, columnIndex] = getCellPosition(className);
    if (rowIndex === 0) headerState.current[columnIndex].text = cellText;
    tableContents.current[rowIndex][columnIndex] = cellText;
    fireCellUpdated(rowIndex, columnIndex, cellText);
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
  const updateCellsTextUsingCSV = (target: HTMLElement, CSV: CSV) => {
    const [targetCellRowIndex, targetCellColumnIndex] = getCellPosition(target.className);
    CSV.forEach((row: string[], rowIndex: number) => {
      row.forEach((cellText: string, columnIndex: number) => {
        const updatedRow = targetCellRowIndex + rowIndex;
        const updatedColumn = targetCellColumnIndex + columnIndex;
        let newText = cellText;
        if (updatedRow === 0) {
          if (getNumberOfIdenticalHeaderText(cellText) > 0) {
            newText = defaultValue || '';
            target.textContent = newText;
          }
          headerState.current[updatedColumn].text = newText;
        }
        tableContents.current[updatedRow][updatedColumn] = newText;
        fireCellUpdated(updatedRow, updatedColumn, newText);
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
      updateCellsTextUsingCSV(event.target as HTMLElement, CSV);
    } else {
      updateCellText(event.target as HTMLElement);
    }
    return false;
  };

  const updateCellTextUsingSpecificValue = (target: HTMLElement, newValue: string) => {
    target.textContent = newValue;
    updateCellText(target);
  };

  const manageDefaultValue = (targetElement: HTMLElement, defaultValue: string) => {
    if (targetElement.textContent?.trim() === '') {
      updateCellTextUsingSpecificValue(targetElement, defaultValue);
    } else if (
      targetElement.className.indexOf(defaultValueClassName) > -1 &&
      targetElement.textContent?.trim() !== defaultValue
    ) {
      forceRerender(!rerenderState);
    }
  };

  const defaultHeaderOnBlurIfDuplicate = (targetElement: HTMLElement) => {
    const { className, textContent: cellText } = targetElement;
    const [rowIndex, columnIndex] = getCellPosition(className);
    if (rowIndex === 0 && getNumberOfIdenticalHeaderText(cellText as string) > 1) {
      const newText = defaultValue || '';
      headerState.current[columnIndex].text = newText;
      tableContents.current[rowIndex][columnIndex] = newText;
      targetElement.textContent = newText;
      fireCellUpdated(rowIndex, columnIndex, newText);
      fireTableUpdated();
    }
  };

  const onCellBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    const targetElement = event.target as HTMLElement;
    if (defaultValue) manageDefaultValue(targetElement, defaultValue);
    defaultHeaderOnBlurIfDuplicate(event.target);
  };

  const generateCells = (dataRow: TableRow, rowIndex: number, isHeader = false) => {
    const isContentEditable = isHeader ? areHeadersEditable : true;
    return dataRow.map((cellText: string, columnIndex: number) => {
      const isDefaultValue = typeof defaultValue !== 'undefined' && cellText === defaultValue;
      return (
        <div
          className={`row-${rowIndex}-column-${columnIndex} cell ${isDefaultValue ? defaultValueClassName : ''}`}
          key={columnIndex}
          contentEditable={isContentEditable}
          onInput={updateCellOnInput}
          onPaste={updateCellsOnPaste}
          onMouseDown={(e) => (isDefaultValue ? updateCellTextUsingSpecificValue(e.target as HTMLElement, '') : {})}
          onBlur={(e) => onCellBlur(e)}
          suppressContentEditableWarning={true}
        >
          {cellText}
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
      <div className="header">{populateDataRow(headers || tableContents.current[0], 0, true)}</div>
      <div className="data">{populateData(tableContents.current.slice(1))}</div>
      <div className="add-new-row-row row" onClick={addNewRow}>
        <div className="add-new-row-cell cell">+ New</div>
      </div>
    </div>
  );
}

Table.defaultProps = {
  areHeadersEditable: true,
};
