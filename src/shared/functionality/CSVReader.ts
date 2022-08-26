import { CSV } from '../types/CSV';
import Papa from 'papaparse';

export class CSVReader {
  // TO-DO error handling
  private static async fetchString(path: string): Promise<string | null> {
    const response = await fetch(path);
    if (!response?.body) return null;
    const reader = response.body.getReader();
    const result = await reader.read();
    const decoder = new TextDecoder('utf-8');
    return decoder.decode(result.value);
  }

  public static async fetch(path: string): Promise<CSV | null> {
    const stringCSV = await CSVReader.fetchString(path);
    if (!stringCSV) return null;
    const parsedCSV = Papa.parse(stringCSV);
    return parsedCSV.data as CSV;
  }
}
