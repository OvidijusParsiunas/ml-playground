export type HeaderColumnType = 'number' | 'string';

export interface TableHeader {
  text: string;
  type?: HeaderColumnType;
}

export type TableHeaders = TableHeader[];
