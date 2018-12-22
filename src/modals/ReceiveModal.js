import React from 'react';

const ReceiveModal = ({closeModal}) => {
  const myAddress = '0x0A7E5D81c57fDFC97270135633E77F505170807C';
  return (
    <div className='modal-backdrop'>
      <div className='receive-modal-container modal-dialog'>
        <div className='receive-modal-header'>
          <span>
            <i className='fas fa-arrow-circle-down btn-icon' />
            Receive to Metamask Wallet
          </span>
          <button
            className='btn btn-cancel no-margin'
            value='close'
            onClick={() => closeModal(false)}
          >
            Close
          </button>
        </div>
        <div className='qr-code' />
        <div className='receive-address'>
          <span>{myAddress}</span>
        </div>
      </div>
    </div>
  );
};

export default ReceiveModal;
