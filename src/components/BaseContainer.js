import React from 'react';
import Account from './Account';

const BaseContainer = ({account, connectionStatus, web3, toggleReceiveModal, toggleSendModal}) => {
  return (
    <div className='base-container'>
      {!connectionStatus ?
        <div className='error-connect-container'>
          <span className='error-connect-metamask'>
            Please unlock your MetaMask wallet
          </span>
        </div> :
      <Account 
        account={account} 
        web3={web3} 
        toggleReceiveModal={toggleReceiveModal} 
        toggleSendModal={toggleSendModal}
      />}
    </div>
  );
}

export default BaseContainer;
