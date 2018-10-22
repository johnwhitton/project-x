import React, {Component} from 'react';

class ReceiveModal extends Component {
  state = {
    isShowingModal: false,
  }
  handleClick = () => this.setState({isShowingModal: true})
  handleClose = () => this.setState({isShowingModal: false})
  render() {
    const myAddress = '0x0A7E5D81c57fDFC97270135633E77F505170807C';
    return (
     <div className='receive-modal-container'>
        <div className='receive-modal-header'>
          <span>
            <i class='fas fa-arrow-circle-down btn-icon'></i>
              Receive to Metamask Wallet
          </span>
          <button className='btn btn-cancel no-margin' value='submit' onClick={(e) => e.preventDefault()}>Close</button>
        </div>
        <div className='qr-code'></div>
        <div className='receive-address'><span>{myAddress}</span></div>
     </div>
    )
  }
}

export default ReceiveModal;