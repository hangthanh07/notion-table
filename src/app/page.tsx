'use client';

import { Box, Typography, Container } from '@mui/material';
import TableView from '@/components/TableView/TableView';

export default function Home() {
  return (
    <Container maxWidth='xl'>
      <Box sx={{ my: 4 }}>
        <Typography
          variant='h4'
          component='h1'
          gutterBottom
          align='center'
        >
          Notion Table View
        </Typography>

        <Box sx={{ mt: 4 }}>
          <TableView pageSize={10} />
        </Box>
      </Box>
    </Container>
  );
}
