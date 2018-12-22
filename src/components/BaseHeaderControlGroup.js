import React from 'react';
import NetworkStatus from './NetworkStatus';

const BaseHeaderControlGroup = ({connectionStatus}) => (
  <div className='header-control-group-container'>
    <div className='network-container'>
      <NetworkStatus connectionStatus={connectionStatus} />
      <span className='network-name'>Ropsten</span>
    </div>
  </div>
);

export default BaseHeaderControlGroup;
