import { useRef, useState, useEffect } from 'react';

type UseColumnResizeProps = {
  columnId: string;
  initialWidth?: number;
  onResize: (columnId: string, width: number) => void;
};

export const useColumnResize = ({
  columnId,
  onResize,
  initialWidth = 150,
}: UseColumnResizeProps) => {
  const [width, setWidth] = useState(initialWidth);
  const resizingRef = useRef(false);
  const startXRef = useRef(0);
  const startWidthRef = useRef(0);

  const handleResizeStart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    resizingRef.current = true;
    startXRef.current = e.clientX;
    startWidthRef.current = width;

    window.addEventListener('mousemove', handleResizeMove);
    window.addEventListener('mouseup', handleResizeEnd);
    document.body.style.cursor = 'col-resize';
  };

  const handleResizeMove = (e) => {
    if (!resizingRef.current) return;

    const diff = e.clientX - startXRef.current;
    const newWidth = Math.max(50, startWidthRef.current + diff);
    setWidth(newWidth);
  };

  const handleResizeEnd = () => {
    if (!resizingRef.current) return;

    resizingRef.current = false;
    onResize(columnId, width);

    window.removeEventListener('mousemove', handleResizeMove);
    window.removeEventListener('mouseup', handleResizeEnd);
    document.body.style.cursor = '';
  };

  useEffect(() => {
    return () => {
      window.removeEventListener('mousemove', handleResizeMove);
      window.removeEventListener('mouseup', handleResizeEnd);
    };
  }, []);

  return {
    width,
    isResizing: resizingRef.current,
    onResizeStart: handleResizeStart,
  };
};
