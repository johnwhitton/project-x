import React from 'react';

const NetworkStatus = ({connectionStatus}) => {
  return (
    <div>
      {connectionStatus ?
        <div className='network-status-indicator network-connected'></div>
        : <div className='network-status-indicator network-disconnected'></div>}
    </div>
  )
};

export default NetworkStatus;