import React, {Component} from 'react';

import AccountBalances from './AccountBalances';
import ButtonGroup from './ButtonGroup';
import ManageShell from './ManageShell';
import Metamask from './Metamask';

class Account extends Component {
  state = {
    view: 'balances',
  }
  setViewMode = view => {
    this.setState({view: view});
  }
  render() {
    const view = this.state.view;
    return (
      <div className='account-container'>
        <div className='account-top'>
          <div className='action-container'>
            <Metamask/>
            <ButtonGroup/>
          </div>
        </div>
        <div className='account-bottom'>
          {view === 'balances' && (<AccountBalances/>)}
          {view === 'shell' && (<ManageShell/>)}
        </div>
      </div>
    )
  }
};

export default Account;