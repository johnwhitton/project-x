import React from 'react';

import AccountBalances from './AccountBalances';
import ButtonGroup from './ButtonGroup';
import ManageShell from './ManageShell';
import Metamask from './Metamask';

class Account extends React.Component {
  state = {
    view: 'balances',
  };

  setViewMode = view => {
    this.setState({view});
  };

  render() {
    const view = this.state.view;
    const {account, web3, toggleReceiveModal, toggleSendModal} = this.props;
    return (
      <div className='account-container'>
        <div className='account-top'>
          <div className='action-container'>
            <Metamask account={account} />
            <ButtonGroup
              toggleReceiveModal={toggleReceiveModal}
              toggleSendModal={toggleSendModal}
            />
          </div>
        </div>
        <div className='account-bottom'>
          {view === 'balances' && <AccountBalances web3={web3} />}
          {view === 'shell' && <ManageShell />}
        </div>
      </div>
    );
  }
}

export default Account;
