import React from 'react';

const Table = ({columns, rows}) => {
  return (
    <div className='table-container'>
      {columns.map(column => <li>{column}</li>)}
      {rows.map(row => <li>{row.name}</li>)}
    </div>
  )
};

export default Table;