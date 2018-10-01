import React from 'react';

const TableRow = ({row}) => {
  return (
    <tr>
      {Object.keys(row).map(key => 
        <td>{row[key]}</td>
      )}
    </tr>
  )
};

export default TableRow;