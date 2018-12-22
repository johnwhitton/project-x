import React from 'react';

const NetworkStatus = ({connectionStatus}) => (
  <div>
    {connectionStatus ? (
      <div className='network-status-indicator network-connected' />
    ) : (
      <div className='network-status-indicator network-disconnected' />
    )}
  </div>
);

export default NetworkStatus;
