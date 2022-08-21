import { CSVDataToReactTableData } from '../../shared/functionality/reactDataTable/CSVDataToReactTableData';
import { CSVToTrainingData } from '../../shared/functionality/machineLearning/ml5/CSVToTrainingData';
import { ReactTableColumns, ReactTableData } from '../../shared/types/reactTableData';
import { CSVDataReader } from '../../shared/functionality/CSVDataReader';
import { CSVData } from '../../shared/types/CSVData';
import DataTable from 'react-data-table-component';
import { ML5Data } from '../../shared/types/ml5';
import { useEffect, useState } from 'react';

// https://codesandbox.io/s/editable-react-table-gchwp?fontsize=14&hidenavigation=1&theme=dark&file=/src/App.js
// https://react-data-table-component.netlify.app/?path=/docs/getting-started-patterns--page
// https://github.com/revolist/revogrid
export default function TrainTable() {
  const trainingDataPath = 'data/color.csv';

  const [tableColumns, setTableColumns] = useState<ReactTableColumns>([]);
  const [tableData, setTableData] = useState<ReactTableData>([]);
  const [trainData, setTrainData] = useState<ML5Data>([]);

  const populateTable = (CSVData: CSVData): void => {
    const tableData = CSVDataToReactTableData.convert(CSVData);
    setTableColumns(tableData.columns);
    setTableData(tableData.data);
  };

  const processTrainCSV = (CSVData: CSVData): void => {
    const trainingData = CSVToTrainingData.convert(CSVData);
    if (tableData.length === 0) {
      setTrainData(trainingData);
      populateTable(CSVData);
    }
  };

  const fetchAndProcessTrainCSV = (numberOfAttempts = 0): void => {
    if (numberOfAttempts > 3) return;
    CSVDataReader.fetch(trainingDataPath).then((CSVData) => {
      if (CSVData) {
        processTrainCSV(CSVData);
      } else {
        fetchAndProcessTrainCSV(numberOfAttempts + 1);
      }
    });
  };

  useEffect(() => {
    fetchAndProcessTrainCSV();
  }, []);

  const getTable = (): JSX.Element => {
    if (tableColumns.length > 0 && tableData.length > 0) {
      return <DataTable columns={tableColumns} data={tableData} />;
    }
    return <div></div>;
  };

  return <div>{getTable()}</div>;
}
