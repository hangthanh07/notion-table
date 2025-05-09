'use client';

import React, { ReactNode, useState } from 'react';
import {
  TableCell,
  Typography,
  Box,
  Popover,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
} from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { useColumnResize } from '@/hooks/useColumnResize';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TableColumn } from '@/types/table';

type ColumnHeaderAction<T = unknown> = {
  icon: ReactNode;
  title: string;
  action: (params?: T) => void;
};

type ColumnHeaderProps = {
  column: TableColumn;
  actions?: ColumnHeaderAction[];
  resizeColumn: (columnId: string, width: number) => void;
};

export const ColumnHeader = ({
  column,
  actions,
  resizeColumn,
}: ColumnHeaderProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(
    null
  );

  const { width, onResizeStart } = useColumnResize({
    columnId: column.id,
    initialWidth: 150,
    onResize: resizeColumn,
  });

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: { column },
  });

  const handleOpenPopover = (event) => {
    if (!actions || actions.length === 0) return;
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? `table-header-popover-${column.id}` : undefined;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: `${width}px`,
    minWidth: `${width}px`,
    maxWidth: `${width}px`,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <>
      <TableCell
        ref={setNodeRef}
        style={style}
        sx={{
          padding: '12px 16px',
          backgroundColor: isDragging ? '#f0f0f0' : '#f5f5f5',
          position: 'relative',
          borderBottom: '2px solid #e0e0e0',
          userSelect: 'none',
          '&:hover': {
            backgroundColor: '#eeeeee',
          },
        }}
      >
        <Box
          display='flex'
          alignItems='center'
          justifyContent='space-between'
        >
          <Box
            display='flex'
            alignItems='center'
            width='100%'
          >
            <Box
              {...attributes}
              {...listeners}
              sx={{
                cursor: 'grab',
                display: 'flex',
                alignItems: 'center',
                color: '#757575',
                mr: 1,
                '&:hover': { color: '#424242' },
              }}
            >
              <DragIndicatorIcon />
            </Box>

            <Typography
              variant='subtitle2'
              sx={{
                fontWeight: 600,
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                flexGrow: 1,
              }}
            >
              {column.name}
            </Typography>
          </Box>
          <IconButton onClick={handleOpenPopover}>
            <MoreVertOutlinedIcon />
          </IconButton>
        </Box>

        <Box
          onMouseDown={(e) => {
            onResizeStart(e);
          }}
          sx={{
            position: 'absolute',
            top: 0,
            right: -3,
            width: 6,
            height: '100%',
            cursor: 'col-resize',
            zIndex: 10,
            '&:hover': { backgroundColor: 'rgba(150, 201, 244, 0.3)' },
            '&:active': { backgroundColor: 'rgba(150, 201, 244, 0.7)' },
          }}
        />
      </TableCell>
      {!!actions && actions.length !== 0 && (
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClosePopover}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <List>
            {actions.map((action, index) => (
              <ListItem key={`action-${index}`}>
                <ListItemButton
                  onClick={() => {
                    action.action();
                    handleClosePopover();
                  }}
                >
                  <ListItemIcon>{action.icon}</ListItemIcon>
                  <ListItemText primary={action.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Popover>
      )}
    </>
  );
};

export default ColumnHeader;
