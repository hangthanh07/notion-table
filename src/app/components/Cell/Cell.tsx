'use client';

import { CellProps } from './type';
import { TextCell } from './TextCell';
import { NumberCell } from './NumberCell';
import { CheckboxCell } from './CheckboxCell';
import { DateCell } from './DateCell';

import { TableCell } from '@mui/material';

export const Cell = ({ value, type }: CellProps) => {
  const renderCell = () => {
    switch (type) {
      case 'title':
      case 'rich_text':
      case 'select':
      case 'multi_select':
      case 'status':
        return (
          <TextCell
            value={value}
            type={type}
          />
        );

      case 'number':
        return (
          <NumberCell
            value={value}
            type={type}
          />
        );

      case 'checkbox':
        return (
          <CheckboxCell
            value={value}
            type={type}
          />
        );

      case 'date':
        return (
          <DateCell
            value={value}
            type={type}
          />
        );

      default:
        return null
    }
  };

  return (
    <TableCell
      sx={{
        padding: '8px 16px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: 300,
      }}
    >
      {renderCell()}
    </TableCell>
  );
};

export default Cell;
