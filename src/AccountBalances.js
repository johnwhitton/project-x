import React from 'react';
import Table from './Table';

const AccountBalances = () => {
  const dataColumns = ['Asset', 'Symbol', 'Price', 'Total', 'Address'];
  const dataRows = [
    {asset: 'cowri', symbol: 'wri', price: 0, total: 100, key: '0x000'},
    {asset: 'cowri', symbol: 'wri', price: 0, total: 100, key: '0x001'},
    {asset: 'cowri', symbol: 'wri', price: 0, total: 100, key: '0x002'},
  ];
  return (
    <div className='account-balances-container'>
      <Table columns={dataColumns} rows={dataRows}/>
    </div>
  )
};

export default AccountBalances;