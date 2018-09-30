import React from 'react';
import Table from './Table';

const AccountBalances = () => {
  const dataColumns = ['Name', 'Symbol', 'Balance', 'Address'];
  const dataRows = [
    {name: 'cowri', symbol: 'wri', balance: 0, key: '0x000'},
    {name: 'cowri', symbol: 'wri', balance: 0, key: '0x001'},
    {name: 'cowri', symbol: 'wri', balance: 0, key: '0x002'},
  ];
  return (
    <div className='account-balances-container'>
      <Table columns={dataColumns} rows={dataRows}/>
    </div>
  )
};

export default AccountBalances;