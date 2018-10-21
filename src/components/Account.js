import React from 'react';
import Metamask from './Metamask';
import AccountBalances from './AccountBalances';
import ButtonGroup from './ButtonGroup';

const Account = () => {
  return (
    <div className='account-container'>
      <div className='account-top'>
        <div className='action-container'>
          <Metamask/>
          <ButtonGroup/>
        </div>
      </div>
      <div className='account-bottom'>
        <AccountBalances/>
      </div>
    </div>
  )
};

export default Account;