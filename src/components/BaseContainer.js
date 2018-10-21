import React from 'react';
import Account from './Account';

const BaseContainer = ({connectionStatus}) => {
  return (
    <div className='base-container'>
      {!connectionStatus ?
        <span className='error-connect-metamask'>
          Please unlock your MetaMask wallet
        </span> :
      <Account/>}
    </div>
  );
}

export default BaseContainer;
