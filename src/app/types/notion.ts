export type NotionPropertyType =
  | 'title'
  | 'rich_text'
  | 'number'
  | 'select'
  | 'multi_select'
  | 'date'
  | 'people'
  | 'files'
  | 'checkbox'
  | 'url'
  | 'email'
  | 'phone_number'
  | 'formula'
  | 'relation'
  | 'rollup'
  | 'created_time'
  | 'created_by'
  | 'last_edited_time'
  | 'last_edited_by'
  | 'status'
  | 'timestamp';

export type NotionSelectOption = {
  id: string;
  name: string;
  color: string;
}

export type NotionSchemaProperty = {
  id: string;
  name: string;
  type: NotionPropertyType;
  options?: NotionSelectOption[];
}

export type NotionSchema = {
  properties: Record<string, NotionSchemaProperty>;
}

export type NotionTitleValue = {
  type: 'title';
  title: Array<{ plain_text: string }>;
}

export type NotionRichTextValue = {
  type: 'rich_text';
  rich_text: Array<{ plain_text: string }>;
}

export type NotionNumberValue = {
  type: 'number';
  number: number | null;
}

export type NotionSelectValue = {
  type: 'select';
  select: NotionSelectOption | null;
}

export type NotionMultiSelectValue = {
  type: 'multi_select';
  multi_select: NotionSelectOption[];
}

export type NotionDateValue = {
  type: 'date';
  date: {
    start: string;
    end: string | null;
  } | null;
}

export type NotionCheckboxValue = {
  type: 'checkbox';
  checkbox: boolean;
}

export type NotionStatusValue = {
  type: 'status';
  status: NotionSelectOption | null;
}


export type NotionPropertyValue =
  | NotionTitleValue
  | NotionRichTextValue
  | NotionNumberValue
  | NotionSelectValue
  | NotionMultiSelectValue
  | NotionDateValue
  | NotionCheckboxValue
  | NotionStatusValue;

  export type NotionSupportFilterPropertyType =
  | 'status';

export type NotionDatabaseRow = {
  id: string;
  properties: Record<string, NotionPropertyValue>;
}

export type NotionDatabaseResponse = {
  results: NotionDatabaseRow[];
  has_more: boolean;
  next_cursor: string | null;
}

// API request types
export type NotionFilterCondition = {
  property: string;
  operator: string;
  value: any;
}

export type NotionSortCondition = {
  property: string;
  direction: 'ascending' | 'descending';
}

export type NotionDatabaseQueryParams  ={
  database_id: string;
  filter?: NotionFilterCondition[];
  sorts?: NotionSortCondition[];
  page_size?: number;
  start_cursor?: string;
}

export type NotionDatabaseSchemaParams = {
  database_id: string;
}
