import ABI from '../ABI'
import React, {Component} from 'react';
import ShellABI from '../ShellABI';
import Table from './Table';
import { convertValueToTokenDecimals, convertValueFromTokenDecimals, getTokenToCowriRatio } from '../utils/utils';

class AccountBalances extends Component {

  DATA_COLUMNS = [
    {name: 'Asset', className: 'column-asset'}, 
    {name: 'Quantity', className: 'column-quantity'}, 
    {name: 'Price', className: 'column-price'}, 
    {name: 'Total', className: 'column-total'}, 
  ];
  // const dataRows = [
  //   {asset: 'Gnosis', quantity: 24456.12, symbol: 'gno', price: 0.21, total: 5135.76, address: '0x000'},
  //   {asset: 'Aragon', quantity: 1649.29, symbol: 'ant', price: 2.34, total: 3858.66, address: '0x001'},
  //   {asset: '0x', quantity: 3982.1994, symbol: 'zrx', price: 0.54, total: 2144.99, address: '0x002'},
  //   {asset: 'Golem', quantity: 1432.00182, symbol: 'gnt', price: 0.23, total: 329.36, address: '0x003'},
  //   {asset: 'Maker', quantity: 10.816002, symbol: 'mkr', price: 714.63, total: 583.14, address: '0x004'},
  // ];
  state = {
      cowriToken: {},
      shellMappingContract: {},
      cowriShellMap: [],
      localShell: [],
      maxShellSize: 0,
    };

  // TODO: load shell mapping contract address from DB
  SHELL_MAPPING_CONTRACT_ADDRESS = '0xc8f91597515f5baa3ec9767b34b517cdeb839855';
  MAX_SHELL_SIZE = 10;
  DECIMALS = 18;

  async componentDidMount() {
    await this.getShellMappingContract();
    await this.setMaxShellSize();
    await this.getShellMap();
  };

  /**
   * get shell mapping contract
   */
  getShellMappingContract = async () => {
    const shellMappingContract = await new this.props.web3.eth.Contract(ABI, this.SHELL_MAPPING_CONTRACT_ADDRESS);
    this.setState({ shellMappingContract }, () => console.info('shell mapping contract set'));
  };

  /**
   * get max shell size from contract and save in state
   */
  setMaxShellSize = async () => {
    const maxShellSize = await this.state.shellMappingContract.methods.maxShellSize().call();
    this.setState({ maxShellSize: Number(maxShellSize) }, () => console.info('max shell size set'));
  };

  /**
   * get users shell map from contract
   */
  getShellMap = async () => {
    const localAccounts = await this.props.web3.eth.getAccounts();
    const tokenContracts = [];
    for (let i = 0; i < this.state.maxShellSize; i++) {
      try {
        const tokenContract = await this.state.shellMappingContract.methods.shellMap(localAccounts[0], i).call();
        tokenContracts.push(tokenContract);
      } catch (e) {
        // TODO: server side logging -- no more contracts in shell map
        break;
      }
    }
    if (tokenContracts.length > 0) {
      this.setState({ cowriShellMap: tokenContracts }, () => this.buildLocalShell(this.state.cowriShellMap));
    } else {
      // prompt user to create shell
      console.log('create shell!');
    }
  };

  /**
   * build local shell (in parrallel)
   */
  buildLocalShell = async cowriShellMap => {
    const localAccounts = await this.props.web3.eth.getAccounts();
    const localShell = [];
    await Promise.all(cowriShellMap.map(async contractAddress  => {
      const tokenContract = await new this.props.web3.eth.Contract(ShellABI, contractAddress);
      const contractBalance = await tokenContract.methods.balanceOf(localAccounts[0]).call();
      const asset = await tokenContract.methods.name().call();
      const symbol = await tokenContract.methods.symbol().call();
      const decimals = await tokenContract.methods.decimals().call();
      const quantity = convertValueFromTokenDecimals(contractBalance, decimals);
      const price = 1;
      const total = quantity * price;
      const address = contractAddress;

      if (quantity > 0) {
        localShell.push({ address, asset, price, quantity, symbol, total });
      }
    }));

    this.setState({ localShell }, () => this.getCowriBalance(this.state.localShell));
  };

  /**
   * get cowri balance
   */
  getCowriBalance = localShell => {
    const price = 1;
    const symbol = 'wri';
    const asset = 'Cowri';
    const address = '0x0000';
    const quantity = localShell.reduce((currentQuantity, token) => {
      return currentQuantity += token.quantity;
    }, 0);
    const total = quantity * price;

    const cowriToken = {
      address,
      asset,
      price,
      quantity,
      symbol,
      total,
    }

    this.setState({cowriToken: cowriToken});
  };

  render() {
    return (
      <div className='account-balances-container'>
        <Table columns={this.DATA_COLUMNS} rows={[this.state.cowriToken, ...this.state.localShell]}/>
      </div>
    )
  }

};

export default AccountBalances;