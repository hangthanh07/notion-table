'use client';

import React from 'react';
import { Checkbox } from '@mui/material';
import { CellProps } from './type';

export const CheckboxCell = ({ value }: CellProps) => {
  return (
    <Checkbox 
      checked={Boolean(value)} 
      disabled={true} 
      size="small"
      sx={{ padding: 0 }}
    />
  );
};