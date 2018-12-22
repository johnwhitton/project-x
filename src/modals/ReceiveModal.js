import React from 'react';

const ReceiveModal = ({account, closeModal, qr}) => (
  <div className='modal-backdrop'>
    <div className='receive-modal-container modal-dialog'>
      <div className='receive-modal-header'>
        <span>
          <i className='fas fa-arrow-circle-down btn-icon' />
          Receive to Metamask Wallet
        </span>
        <button
          className='btn btn-cancel no-margin'
          onClick={() => closeModal(false)}
          type='button'
          value='close'
        >
          Close
        </button>
      </div>
      <div className='qr-code-container'>
        <img src={qr} alt='qr code' className='qr-code' />
      </div>
      <div className='receive-address'>
        <span>{account}</span>
      </div>
    </div>
  </div>
);
export default ReceiveModal;
