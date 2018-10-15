import React, {Component} from 'react';

class SendModal extends Component {
  state = {
    isShowingModal: false,
  }
  handleClick = () => this.setState({isShowingModal: true})
  handleClose = () => this.setState({isShowingModal: false})
  render() {
    return (
     <div></div>
    )
  }
}

export default SendModal;