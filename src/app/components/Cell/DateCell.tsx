'use client';

import React from 'react';
import { Typography } from '@mui/material';
import { CellProps } from './type';

export const DateCell = ({ value }: CellProps) => {
  const { start, end } = value;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <Typography variant="body2" noWrap>
      {formatDate(start)}
      {end && ` - ${formatDate(end)}`}
    </Typography>
  );
};