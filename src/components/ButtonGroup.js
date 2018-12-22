import React, {Component} from 'react';

const ButtonGroup = ({toggleReceiveModal, toggleSendModal}) => (
  <div>
    <div className='button-group-container'>
      <button
        onClick={toggleReceiveModal.bind(null, true)}
        className='btn btn-receive'
      >
        <i className='fas fa-qrcode btn-icon' />
        Receive
      </button>
      <button
        onClick={toggleSendModal.bind(null, true)}
        className='btn btn-send'
      >
        <i className='fas fa-arrow-circle-up btn-icon' />
        Send
      </button>
    </div>
  </div>
);

export default ButtonGroup;
