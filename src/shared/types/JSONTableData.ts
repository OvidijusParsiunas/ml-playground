// difference between this and tableContents is that tableContents contains both header and data whereas this is just data
export interface JSONTableData {
  [key: number]: string[];
}
