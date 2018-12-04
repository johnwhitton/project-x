import React, {Component} from 'react';

const ButtonGroup = ({toggleReceiveModal, toggleSendModal}) => {
  return (
    <div>
      <div className='button-group-container'>
        <button 
          onClick={toggleReceiveModal.bind(null, true)} 
          className='btn btn-receive'>
            <i className="fas fa-qrcode btn-icon"></i>Receive
        </button>
        <button 
          onClick={toggleSendModal.bind(null, true)}
          className='btn btn-send'>
            <i className="fas fa-arrow-circle-up btn-icon"></i>Send
        </button>
      </div>
    </div>
  )
}

export default ButtonGroup;