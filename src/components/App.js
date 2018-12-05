import BaseContainer from './BaseContainer';
import BaseHeader from './BaseHeader';
import React, {Component, Fragment} from 'react';
import ReceiveModal from '../modals/ReceiveModal';
import SendModal from '../modals/SendModal';
import web3 from '../web3';

type State = {
  account: string,
  connected: boolean,
  isSendModalVisible: boolean,
  isReceiveModalVisible: boolean,
};

class App extends Component<State> {
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
      this.setState({connected: false});
    }
  }

  _toggleSendModal = (visible: boolean) => {
    this.setState(({isSendModalVisible}) => ({isSendModalVisible: visible}));
  }

  _toggleReceiveModal = (visible: boolean) => {
    console.log(visible)
    this.setState(({isReceiveModalVisible}) => ({isReceiveModalVisible: visible}));
  }

  render() { 
    const {account, connected, isReceiveModalVisible, isSendModalVisible} = this.state;
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
        { isSendModalVisible && (<SendModal/>) }
        { isReceiveModalVisible && (<ReceiveModal/>) }
      </Fragment>
    );
  }
}

export default App;
