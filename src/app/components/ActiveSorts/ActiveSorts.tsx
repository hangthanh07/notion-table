import { SortState } from '@/types/table';

import { Chip, Stack, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

type ActiveSortsProps = {
  currentSorts: SortState[];
  removeSort: (columnId: string) => void;
};

const ActiveSorts = ({ currentSorts, removeSort }: ActiveSortsProps) => {
  return (
    <Stack
      spacing={1}
      sx={{ p: 1, minHeight: 30 }}
    >
      {currentSorts.length > 0 && (
        <Stack
          direction='row'
          spacing={1}
          sx={{ alignItems: 'center', flexWrap: 'wrap', gap: 0.5 }}
        >
          <Typography
            variant='body2'
            sx={{ fontWeight: 'bold' }}
          >
            Sorts:
          </Typography>
          {currentSorts.map((items) => (
            <Chip
              color='primary'
              variant='outlined'
              label={`${items.columnId} ${items.direction}`}
              key={items.columnId}
              onDelete={() => removeSort(items.columnId)}
              icon={
                items.direction === 'ascending' ? (
                  <ArrowUpwardIcon />
                ) : (
                  <ArrowDownwardIcon />
                )
              }
              size='small'
            />
          ))}
        </Stack>
      )}
    </Stack>
  );
};

export default ActiveSorts;
