import BaseContainer from './BaseContainer';
import BaseHeader from './BaseHeader';
import React, {Component, Fragment} from 'react';
import ReceiveModal from '../modals/ReceiveModal';
import SendModal from '../modals/SendModal';
import web3 from '../web3';

class App extends Component {
  state = {
    account: '',
    connected: 'false',
  }

  async componentDidMount() {
    const accounts = await web3.eth.getAccounts();
    if (accounts.length > 0 ) {
      this.setState({
        account: accounts[0],
        connected: true,
      });
    } else {
      this.setState({connected: false});
    }
  }

  render() { 
    const {connected, account} = this.state;
    const showSendModal = false;
    const showReceiveModal = false;
    return (
      <Fragment>
        <div className='cowri-root'>
          <BaseHeader connectionStatus={connected}/>
          <BaseContainer connectionStatus={connected} account={account} web3={web3}/>
        </div>
        { showSendModal && (<SendModal/>) }
        { showReceiveModal && (<ReceiveModal/>) }
      </Fragment>
    );
  }
}

export default App;
