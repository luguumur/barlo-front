import React, { useEffect, useRef, useState } from 'react';

interface MasonryGridProps {
  children: React.ReactNode;
  gap: number;
}

const MasonryGrid: React.FC<MasonryGridProps> = ({ children, gap }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [columnWidth, setColumnWidth] = useState<number>(300); // Default column width

  useEffect(() => {
    const resizeMasonry = () => {
      const grid:any = gridRef.current;
      if (grid) {
        const containerWidth = grid.offsetWidth;
        const newColumnWidth = calculateColumnWidth(containerWidth, gap);
        setColumnWidth(newColumnWidth);
        const items = grid.children;
        const columnCount = Math.floor(containerWidth / (newColumnWidth + gap));
        const columns = Array.from({ length: columnCount }, () => []);
        Array.from(items).forEach((item:any, index) => {
          const shortestColumn:any = columns.reduce((acc, column, i) => (column.length < acc.length ? column : acc), columns[0]);
          shortestColumn.push(item);
          const leftOffset = (newColumnWidth + gap) * columns.indexOf(shortestColumn);
          item.setAttribute('style', `position: absolute; top: ${shortestColumn.length > 1 ? shortestColumn[shortestColumn.length - 2].offsetTop + shortestColumn[shortestColumn.length - 2].offsetHeight + gap : 0}px; left: ${leftOffset}px; width: ${newColumnWidth}px;`);
        });
        grid.style.height = `${Math.max(...columns.map(column => column.reduce((acc, item:any) => acc + item.offsetHeight + gap, 0)), 0)}px`;
      }
    };

    resizeMasonry();

    window.addEventListener('resize', resizeMasonry);
    return () => window.removeEventListener('resize', resizeMasonry);
  }, [gap]);

  const calculateColumnWidth = (containerWidth: number, gap: number): number => {
    if (containerWidth >= 750) {
      return (containerWidth / 3) - gap; // 3 columns for medium screens
    } else {
      return (containerWidth / 2)  - gap; // 1 column for small screens
    }
  };

  return (
    <div ref={gridRef} className="relative">
      {children}
    </div>
  );
};

export default MasonryGrid;
