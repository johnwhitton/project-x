import React from 'react';
import TableRow from './TableRow.js';
import TableColumn from './TableColumn.js';

const Table = ({columns, rows}) => {
  return (
    <div className='table-container'>
      <TableColumn data={columns}/>
        {Object.keys(rows).map(row => (
          <TableRow data={rows[row]} key={rows[row].address}/>
        ))}
    </div>
  )
};

export default Table;