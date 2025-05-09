import { NotionPropertyType, NotionSelectOption } from '@/types/notion';

export type CellProps = {
  value: any;
  type: NotionPropertyType;
  options?: NotionSelectOption[];
};
