import React from 'react';

const ButtonGroup = ({toggleReceiveModal, toggleSendModal}) => (
  <div>
    <div className='button-group-container'>
      <button
        className='btn btn-receive'
        onClick={toggleReceiveModal.bind(null, true)}
        type='button'
      >
        <i className='fas fa-qrcode btn-icon' />
        Receive
      </button>
      <button
        className='btn btn-send'
        onClick={toggleSendModal.bind(null, true)}
        type='button'
      >
        <i className='fas fa-arrow-circle-up btn-icon' />
        Send
      </button>
    </div>
  </div>
);

export default ButtonGroup;
