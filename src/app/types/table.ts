import { NotionPropertyType } from '@/types/notion';

export type TableColumn = {
  id: string;
  name: string;
  type: NotionPropertyType;
}

export type TableRow = {
  id: string;
  [key: string]: any;
}

export type TableState  ={
  columns: TableColumn[];
  rows: TableRow[];
  hasMore: boolean;
  nextCursor: string | null;
}

export type SortDirection = 'ascending' | 'descending';

export type SortState = {
  columnId: string;
  direction: SortDirection
}

export type FilterOperator = {
  label: string;
  value: string;
  inputType?: 'text' | 'number' | 'date' | 'boolean' | 'select' | 'none';
}

export type FilterCondition = {
  columnId: string;
  operator: string;
  value: any;
}

export type FilterState = {
  conditions: FilterCondition[];
}

export type FilterOperatorsByType = {
  [key in NotionPropertyType]?: FilterOperator[];
};