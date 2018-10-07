import React from 'react';
 
 const formatter = new Intl.NumberFormat('en-US', {
   style: 'currency',
   currency: 'USD',
   minimumFractionDigits: 2,
 });

const TableRow = ({data}) => {
  return (
    <div className='table-row-container'>
      <div className='row-item row-asset'>{data.asset}</div>
      <div className='row-item row-quantity'>{`${data.quantity} ${data.symbol}`}</div>
      <div className='row-item row-price'>{formatter.format(data.price)}</div>
      <div className='row-item row-total'>{formatter.format(data.total)}</div>
    </div>
  )
};

export default TableRow;