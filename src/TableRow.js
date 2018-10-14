import React from 'react';
 
 const USDFormatter = new Intl.NumberFormat('en-US', {
   style: 'currency',
   currency: 'USD',
   minimumFractionDigits: 2,
 });

 const AssetFormatter = new Intl.NumberFormat('en-US', {
   minimumFractionDigits: 3,
 });

const TableRow = ({data}) => {
  return (
    <div className='table-row-container'>
      <div className='row-item row-asset'>{data.asset}</div>
      <div className='row-item row-quantity'>{`${AssetFormatter.format(data.quantity)} ${data.symbol}`}</div>
      <div className='row-item row-price'>{USDFormatter.format(data.price)}</div>
      <div className='row-item row-total'>{USDFormatter.format(data.total)}</div>
    </div>
  )
};

export default TableRow;