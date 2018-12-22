import React from 'react';

const TableColumn = ({data}) => (
  <div className='table-column-container'>
    {data.map((column, index) => (
      <div className={`column-item ${column.className}`} key={index}>
        {column.name}
      </div>
    ))}
  </div>
);

export default TableColumn;
