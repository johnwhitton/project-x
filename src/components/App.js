import React, {Fragment} from 'react';
import QRCode from 'qrcode';
import BaseContainer from './BaseContainer';
import BaseHeader from './BaseHeader';
import ReceiveModal from '../modals/ReceiveModal';
import SendModal from '../modals/SendModal';
import web3 from '../web3';

class App extends React.PureComponent {
  state = {
    account: '',
    connected: false,
    isSendModalVisible: false,
    isReceiveModalVisible: false,
    qr: '',
  };

  async componentDidMount() {
    const accounts = await web3.eth.getAccounts();
    if (accounts.length > 0) {
      const qrURI = await QRCode.toDataURL(accounts[0]);
      this.setState({
        account: accounts[0],
        connected: true,
        qr: qrURI,
      });
    } else {
      this.setState({connected: false});
    }
  }

  toggleSendModal = visible => {
    this.setState({isSendModalVisible: visible});
  };

  toggleReceiveModal = visible => {
    this.setState({isReceiveModalVisible: visible});
  };

  render() {
    const {
      account,
      connected,
      isReceiveModalVisible,
      isSendModalVisible,
      qr,
    } = this.state;
    return (
      <Fragment>
        <div className='cowri-root'>
          <BaseHeader connectionStatus={connected} />
          <BaseContainer
            account={account}
            connectionStatus={connected}
            toggleReceiveModal={this.toggleReceiveModal}
            toggleSendModal={this.toggleSendModal}
            web3={web3}
          />
        </div>
        {isSendModalVisible && (
          <SendModal
            account={account}
            closeModal={this.toggleSendModal}
            web3={web3}
          />
        )}
        {isReceiveModalVisible && (
          <ReceiveModal
            account={account}
            closeModal={this.toggleReceiveModal}
            qr={qr}
          />
        )}
      </Fragment>
    );
  }
}

export default App;
