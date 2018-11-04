import React, {Component} from 'react';

import AddTokenCard from './AddTokenCard';
import TokenCard from './TokenCard';

import basisImage from '../images/basis.png';
import carbonImage from '../images/carbon.png';
import daiImage from '../images/dai.png';
import mkrImage from '../images/mkr.png';
import paxImage from '../images/pax.png';
import tusdImage from '../images/tusd.png';
import usdcImage from '../images/usdc.png';
import usdtImage from '../images/usdt.png';

class ManageShell extends Component {
  state = {
    localShell: [],
    tokensToBeRemoved: [],
    error: false,
    errorMessage: '',
  }
  
  DEFAULT_SHELL = [
    {name: 'TrueUSD', source: tusdImage},
    {name: 'Dai', source: daiImage},
    {name: 'USDC', source: usdcImage},
    {name: 'Paxos', source: paxImage},
    {name: 'Basecoin', source: basisImage}, 
    {name: 'Tether', source: usdtImage},
    {name: 'Maker', source: mkrImage},
    {name: 'Carbon', source: carbonImage},
  ];

  componentDidMount = () => {
    this.getLocalShell();
  }

  getLocalShell = () => {
    if (this.state.localShell.length === 0) {
      this.setState({localShell: [...this.DEFAULT_SHELL]});
    }
  }

  addLocalShellToken = token => {
    const includesToken = Boolean(this.state.localShell.find(currentToken => currentToken.name === token));
    if (includesToken) {
      this.setState({error: true, errorMessage: `Your shell already contains ${token}!`});
      return;
    }
    this.setState(prevState => ({
      localShell: [...prevState.localShell, {token}],
    }));
  }

  removeLocalShellToken = token => {
    const includesToken = Boolean(this.state.localShell.find(currentToken => currentToken.name === token));
    if (!includesToken) {
      this.setState({error: true, errorMessage: `Your shell does not contain ${token}!`});
      return;
    }
    // TODO: refactor
    const localShellTokenIndex = this.state.localShell.findIndex(currentToken => currentToken.name === token);
    const tokenToBeRemovedIndex = this.state.tokensToBeRemoved.findIndex(currentToken => currentToken.name === token);
    const updatedLocalShell = this.state.localShell;
    const updatedtokensToBeRemoved = this.state.tokensToBeRemoved;
    updatedLocalShell.splice(localShellTokenIndex, 1);
    updatedtokensToBeRemoved.splice(tokenToBeRemovedIndex, 1);
    this.setState({
      localShell: updatedLocalShell, 
      tokensToBeRemoved: updatedtokensToBeRemoved,
    });
  }

  removeSelectedTokens = async () => {
    await Promise.all([...this.state.tokensToBeRemoved].map(async token => {
      await this.removeLocalShellToken(token);
   }));
  }

  setTokensToBeRemoved = tokenName => {
    let updatedtokensToBeRemoved;
    if (this.state.tokensToBeRemoved.includes(tokenName)) {
      const targetIndex = this.state.tokensToBeRemoved.indexOf(tokenName);
      updatedtokensToBeRemoved = [...this.state.tokensToBeRemoved];
      updatedtokensToBeRemoved.splice(targetIndex, 1);
    } else {
      updatedtokensToBeRemoved = [...this.state.tokensToBeRemoved, tokenName];
    }
    this.setState({tokensToBeRemoved: updatedtokensToBeRemoved,});
  }

  render() {
    const localShell = this.state.localShell;
    const selectionMessage = 'Which stablecoins would you like to accept?';
    const tokensToBeRemoved = this.state.tokensToBeRemoved;
    return (
      <div className='manage-shell-container'>
        <div className='manage-shell-header-container'>
          <span className='manage-selection-message'>{selectionMessage}</span>
          {Boolean(tokensToBeRemoved.length) && (
            <button 
              className='btn btn-remove no-margin' 
              value='submit' 
              onClick={this.removeSelectedTokens}>
                <i className='far fa-times-circle btn-icon'></i>
                {`Remove from shell`}
            </button>)}
        </div>
        <div className='manage-token-items'>
          {localShell.map(token => (
            <TokenCard 
              token={token} 
              key={token.name}
              setTokensToBeRemoved={this.setTokensToBeRemoved}
            />)
          )}
          <AddTokenCard/>
        </div>
      </div>
    )
  }
};

export default ManageShell;