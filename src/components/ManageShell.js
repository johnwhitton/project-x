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
  };

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
  };

  getLocalShell = () => {
    const {localShell} = this.state;
    if (localShell.length === 0) {
      this.setState({localShell: [...this.DEFAULT_SHELL]});
    }
  };

  addLocalShellToken = token => {
    const {localShell} = this.state;
    const includesToken = Boolean(
      localShell.find(currentToken => currentToken.name === token),
    );
    if (includesToken) {
      // console.log(`Your shell already contains ${token}!`);
      return;
    }
    this.setState(prevState => ({
      localShell: [...prevState.localShell, {token}],
    }));
  };

  removeLocalShellToken = token => {
    const {localShell, tokensToBeRemoved} = this.state;
    const includesToken = Boolean(
      localShell.find(currentToken => currentToken.name === token),
    );
    if (!includesToken) {
      // console.log(`Your shell does not contain ${token}!`);
      return;
    }
    // TODO: refactor
    const localShellTokenIndex = localShell.findIndex(
      currentToken => currentToken.name === token,
    );
    const tokenToBeRemovedIndex = tokensToBeRemoved.findIndex(
      currentToken => currentToken.name === token,
    );
    const updatedLocalShell = localShell;
    const updatedtokensToBeRemoved = tokensToBeRemoved;
    updatedLocalShell.splice(localShellTokenIndex, 1);
    updatedtokensToBeRemoved.splice(tokenToBeRemovedIndex, 1);
    this.setState({
      localShell: updatedLocalShell,
      tokensToBeRemoved: updatedtokensToBeRemoved,
    });
  };

  removeSelectedTokens = async () => {
    const {tokensToBeRemoved} = this.state;
    await Promise.all(
      [...tokensToBeRemoved].map(async token => {
        await this.removeLocalShellToken(token);
      }),
    );
  };

  setTokensToBeRemoved = tokenName => {
    const {tokensToBeRemoved} = this.state;
    let updatedtokensToBeRemoved;
    if (tokensToBeRemoved.includes(tokenName)) {
      const targetIndex = tokensToBeRemoved.indexOf(tokenName);
      updatedtokensToBeRemoved = [...tokensToBeRemoved];
      updatedtokensToBeRemoved.splice(targetIndex, 1);
    } else {
      updatedtokensToBeRemoved = [...tokensToBeRemoved, tokenName];
    }
    this.setState({tokensToBeRemoved: updatedtokensToBeRemoved});
  };

  render() {
    const {localShell, tokensToBeRemoved} = this.state;
    const selectionMessage = 'Which stablecoins would you like to accept?';
    return (
      <div className='manage-shell-container'>
        <div className='manage-shell-header-container'>
          <span className='manage-selection-message'>{selectionMessage}</span>
          {Boolean(tokensToBeRemoved.length) && (
            <button
              className='btn btn-remove no-margin'
              onClick={this.removeSelectedTokens}
              type='button'
              value='submit'
            >
              <i className='far fa-times-circle btn-icon' />
              {`Remove from shell`}
            </button>
          )}
        </div>
        <div className='manage-token-items'>
          {localShell.map(token => (
            <TokenCard
              token={token}
              key={token.name}
              setTokensToBeRemoved={this.setTokensToBeRemoved}
            />
          ))}
          <AddTokenCard />
        </div>
      </div>
    );
  }
}

export default ManageShell;
