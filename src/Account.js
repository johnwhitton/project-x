import React from 'react';
import Metamask from './Metamask';
import AccountBalances from './AccountBalances';

const Account = () => {
  return (
    <div className='account-container'>
      <div className='account-top'>
        <Metamask/>
      </div>
      <div className='account-bottom'>
        <AccountBalances/>
      </div>
    </div>
  )
};

export default Account;