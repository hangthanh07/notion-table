'use client';

import React from 'react';
import { Typography } from '@mui/material';
import { CellProps } from './type';

export const NumberCell = ({ value }: CellProps) => {
  return (
    <Typography variant="body2" align="right" noWrap>
      {value.toLocaleString()}
    </Typography>
  );
};