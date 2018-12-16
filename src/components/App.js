import BaseContainer from './BaseContainer';
import BaseHeader from './BaseHeader';
import React, { Fragment } from 'react';
import ReceiveModal from '../modals/ReceiveModal';
import SendModal from '../modals/SendModal';
import web3 from '../web3';

class App extends React.PureComponent {
  state = {
    account: '',
    connected: false,
    isSendModalVisible: false,
    isReceiveModalVisible: false,
  };

  async componentDidMount() {
    const accounts = await web3.eth.getAccounts();
    if (accounts.length > 0) {
      this.setState({
        account: accounts[0],
        connected: true,
      });
    } else {
      this.setState({ connected: false });
    }
  }

  _toggleSendModal = visible => {
    this.setState(({ isSendModalVisible }) => ({
      isSendModalVisible: visible,
    }));
  };

  _toggleReceiveModal = visible => {
    this.setState(({ isReceiveModalVisible }) => ({
      isReceiveModalVisible: visible,
    }));
  };

  render() {
    const {
      account,
      connected,
      isReceiveModalVisible,
      isSendModalVisible,
    } = this.state;
    return (
      <Fragment>
        <div className='cowri-root'>
          <BaseHeader connectionStatus={connected} />
          <BaseContainer
            account={account}
            connectionStatus={connected}
            toggleReceiveModal={this._toggleReceiveModal}
            toggleSendModal={this._toggleSendModal}
            web3={web3}
          />
        </div>
        {isSendModalVisible && <SendModal closeModal={this._toggleSendModal} />}
        {isReceiveModalVisible && (
          <ReceiveModal closeModal={this._toggleReceiveModal} />
        )}
      </Fragment>
    );
  }
}

export default App;
