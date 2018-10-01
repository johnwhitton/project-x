import React from 'react';
import TableRow from './TableRow.js';
import TableColumn from './TableColumn.js';

const Table = ({columns, rows}) => {
  return (
    <div className='table-container'>
      <table>
        <tr>
          {columns.map(column => <TableColumn column={column}/>)}
        </tr>
        {rows.map(row => <TableRow row={row}/>)}
      </table>
    </div>
  )
};

export default Table;