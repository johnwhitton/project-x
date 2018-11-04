import React, {Component} from 'react';

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
        <div className='button-group-container'>
          <button className='btn btn-receive'><i className="fas fa-qrcode btn-icon"></i>Receive</button>
          <button className='btn btn-send' onClick={this.showSendModal}><i className="fas fa-arrow-circle-up btn-icon"></i>Send</button>
        </div>
      </div>
    )
  }
}

export default ButtonGroup;