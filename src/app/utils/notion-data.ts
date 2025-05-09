import { NotionPropertyValue } from '@/types/notion';
import { TableRow } from '@/types/table';

const extractPropertyValue = (propertyValue: NotionPropertyValue) => {
  switch (propertyValue.type) {
    case 'title':
      return propertyValue.title.map((t) => t.plain_text).join('');

    case 'rich_text':
      return propertyValue.rich_text.map((t) => t.plain_text).join('');

    case 'number':
      return propertyValue.number;

    case 'select':
      return propertyValue.select?.name;

    case 'multi_select':
      return propertyValue.multi_select.map((opt) => opt.name).join(', ');

    case 'date':
      return propertyValue.date;

    case 'checkbox':
      return propertyValue.checkbox;

    case 'status':
      return propertyValue?.status?.name;

    default:
      return null;
  }
};

export const resultsToRows = (pages: any[]) => {
  if (!pages || pages.length === 0) return [];

  return pages.flatMap((page) => {
    return page.results.map((row: any) => {
      const tableRow: TableRow = { id: row.id };

      for (const [propertyId, propertyValue] of Object.entries(
        row.properties
      )) {
        tableRow[propertyId] = extractPropertyValue(
          propertyValue as NotionPropertyValue
        );
      }

      return tableRow;
    });
  });
};
