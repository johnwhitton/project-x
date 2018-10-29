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
    if (this.state.localShell.includes(token)) {
      this.setState({error: true, errorMessage: `Your shell already contains ${token}!`});
      return;
    }
    this.setState(prevState => ({
      localShell: [...prevState.localShell, token],
    }))
  }

  removeLocalShellToken = token => {
    if (!this.state.localShell.includes(token)) {
      this.setState({error: true, errorMessage: `Your shell does not contain ${token}!`});
      return;
    }
    const targetIndex = this.state.localShell.indexOf(token);
    const updatedLocalShell = [...this.state.localShell];
    updatedLocalShell.splice(targetIndex, 1);
    this.setState({localShell: updatedLocalShell,});
  }

  render() {
    const localShell = this.state.localShell;
    const selectionMessage = 'Which stablecoins would you like to accept?';
    return (
      <div className='manage-shell-container'>
        <span className='manage-selection-message'>{selectionMessage}</span>
        <div className='manage-token-items'>
          {localShell.map(token => (<TokenCard token={token} key={token.name}/>))}
          <AddTokenCard/>
        </div>
      </div>
    )
  }
};

export default ManageShell;