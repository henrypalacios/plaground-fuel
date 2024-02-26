import React from 'react';
import styles from './SimpleTable.module.scss';

interface Column<T> {
  title: string;
  render: (data: T) => React.ReactNode;
}

interface SimpleTableProps<T> {
  data: T[];
  columns: Column<T>[];
}

function SimpleTable<T>({ data, columns }: SimpleTableProps<T>): JSX.Element {
  return (
    <div className={styles.simpleTableCard}>
      <table className={styles.simpleTable}>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td key={colIndex}>{column.render(item)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SimpleTable;
