import React, {Component} from 'react';
import SendModal from './modals/SendModal';

class ButtonGroup extends Component {
  state = {
    isSendModalVisible: false,
  }
  showSendModal = () => {
    this.setState({isSendModalVisible: true});
  }
  hideSendModal = () => {
    this.setState({isSendModalVisible: false});
  }
  close
  render() {
    return (
      <div>
        {this.state.isSendModalVisible && <SendModal/>}
        <div className='button-group-container'>
          <button className='btn btn-create-shell'><i className="fas fa-plus btn-icon"></i>Create Shell</button>
          <button className='btn btn-receive'><i className="fas fa-qrcode btn-icon"></i>Receive</button>
          <button className='btn btn-send' onClick={this.showSendModal}><i className="far fa-check-circle btn-icon"></i>Send</button>
        </div>
      </div>
    )
  }
}

export default ButtonGroup;