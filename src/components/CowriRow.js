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

const TableRow = ({data}) => (
  <div className='table-row-container cowri-table-row'>
    <div className='cowri-row-item row-asset'>{data.asset}</div>
    <div className='cowri-row-item row-quantity'>
      {`${AssetFormatter.format(data.quantity)} ${data.symbol}`}
    </div>
    <div className='cowri-row-item row-price'>
      {USDFormatter.format(data.price)}
    </div>
    <div className='cowri-row-item row-total'>
      {USDFormatter.format(data.total)}
    </div>
  </div>
);

export default TableRow;
