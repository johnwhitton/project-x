import React from 'react';

const Metamask = ({account}) => {
  return (
    <div className='metamask-container'>
      <span className='metamask-title'>Metamask</span>
      <span className='metamask-address'>{account}</span>
    </div>
  )
};

export default Metamask;