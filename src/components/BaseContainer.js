import React from 'react';
import Account from './Account';

const BaseContainer = ({account, connectionStatus, web3}) => {
  return (
    <div className='base-container'>
      {!connectionStatus ?
        <span className='error-connect-metamask'>
          Please unlock your MetaMask wallet
        </span> :
      <Account account={account} web3={web3}/>}
    </div>
  );
}

export default BaseContainer;
