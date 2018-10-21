import React, {Component} from 'react';

class SendModal extends Component {
  state = {
    isShowingModal: false,
  }
  handleClick = () => this.setState({isShowingModal: true})
  handleClose = () => this.setState({isShowingModal: false})
  render() {
    return (
     <div className='send-modal-container'>
      <form className='send-modal-form' action=''>
        <div className='send-modal-form-container'>
          <div className='send-modal-input address-input'>
            <label htmlFor='wallet-address'><i className="far fa-check-circle btn-icon"></i>Send from Metamask Wallet</label>
            <input type='text' name='wallet-address' id='wallet-address'/>
          </div>
          <div className='send-modal-input recipient-input'>
            <label htmlFor='recipient-address'>Recipient Address</label>
            <input type='text' name='recipient-address' id='recipient-address'/>
          </div>
          <div className='send-modal-input amount-input'>
            <label htmlFor='cowri-amount'>Amount</label>
            <input type='text' name='cowri-amount' id='cowri-amount'/>
          </div>
          <div className='send-button-group-container'>
            <button className='btn btn-cancel no-margin' onClick={() => ''}>Cancel</button>
            <span>Fee: $0.014</span>
            <button className='btn btn-send no-margin' onClick={() => ''}>
              <i className="far fa-check-circle btn-icon"></i>
              Send
            </button>
          </div>
        </div>
      </form>
     </div>
    )
  }
}

export default SendModal;