import React from 'react';
 
 const USDFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
 });

 const AssetFormatter = new Intl.NumberFormat('en-US', {
  // currency: 'USD',
  style: 'decimal',
  maximumFractionDigits: 2,
 });

const TableRow = ({data}) => {
  console.log(data.quantity)
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