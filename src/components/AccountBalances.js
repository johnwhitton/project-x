import React from 'react';
import Table from './Table';

const AccountBalances = () => {
  const dataColumns = [
    {name: 'Asset', className: 'column-asset'}, 
    {name: 'Quantity', className: 'column-quantity'}, 
    {name: 'Price', className: 'column-price'}, 
    {name: 'Total', className: 'column-total'}, 
  ];
  const dataRows = [
    {asset: 'Gnosis', quantity: 24456.12, symbol: 'gno', price: 0.21, total: 5135.76, address: '0x000'},
    {asset: 'Aragon', quantity: 1649.29, symbol: 'ant', price: 2.34, total: 3858.66, address: '0x001'},
    {asset: '0x', quantity: 3982.1994, symbol: 'zrx', price: 0.54, total: 2144.99, address: '0x002'},
    {asset: 'Golem', quantity: 1432.00182, symbol: 'gnt', price: 0.23, total: 329.36, address: '0x003'},
    {asset: 'Maker', quantity: 10.816002, symbol: 'mkr', price: 714.63, total: 583.14, address: '0x004'},
  ];
  return (
    <div className='account-balances-container'>
      <Table columns={dataColumns} rows={dataRows}/>
    </div>
  )
};

export default AccountBalances;