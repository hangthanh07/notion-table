'use client';

import React from 'react';
import { Typography } from '@mui/material';
import { CellProps } from './type';

export const TextCell = ({ value }: CellProps) => {
  return (
    <Typography
      variant='body2'
      noWrap
    >
      {value}
    </Typography>
  );
};
