import React from 'react';

const ButtonGroup = () => {
  return (
    <div className='button-group-container'>
      <button className='btn btn-create-shell'><i className="fas fa-plus btn-icon"></i>Create Shell</button>
      <button className='btn btn-receive'><i className="fas fa-qrcode btn-icon"></i>Receive</button>
      <button className='btn btn-send'><i className="far fa-check-circle btn-icon"></i>Send</button>
    </div>
  )
};

export default ButtonGroup;