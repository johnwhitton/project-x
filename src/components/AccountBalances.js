import React from 'react';
import ABI from '../ABI';
import ShellABI from '../ShellABI';
import Table from './Table';
import {convertValueFromTokenDecimals} from '../utils/utils';

class AccountBalances extends React.Component {
  DATA_COLUMNS = [
    {name: 'Asset', className: 'column-asset'},
    {name: 'Quantity', className: 'column-quantity'},
    {name: 'Price', className: 'column-price'},
    {name: 'Total', className: 'column-total'},
  ];

  state = {
    cowriShellMap: [],
    cowriToken: {},
    defaultShellMap: [
      '0x802804f1eb96fcf3802fcedf6648f55ddae95208',
      '0xad31da2bfd3113394745954445359caacb54bfef',
      '0x4a110a6b35cfc6d9a3aa485e74c5d013916b7cd1',
      '0xd152f7251cb9d4ee131c2660e4b83b570841864c',
      '0x79a2f3bdee4722dbb813d4a22b4dfcaf73c91d2f',
      '0xafb54039ca6b5a87a1dc7837dbd5fcf0bb24da06',
    ],
    localShell: [],
    maxShellSize: 0,
    shellMappingContract: {},
  };

  // TODO: load shell mapping contract address from DB
  SHELL_MAPPING_CONTRACT_ADDRESS = '0xc8f91597515f5baa3ec9767b34b517cdeb839855';

  MAX_SHELL_SIZE = 10;

  DECIMALS = 18;

  async componentDidMount() {
    await this.getShellMappingContract();
    await this.setMaxShellSize();
    await this.getShellMap();
  }

  /**
   * get shell mapping contract
   */
  getShellMappingContract = async () => {
    const {web3} = this.props;
    const shellMappingContract = await new web3.eth.Contract(
      ABI,
      this.SHELL_MAPPING_CONTRACT_ADDRESS,
    );
    this.setState({shellMappingContract});
  };

  /**
   * get max shell size from contract and save in state
   */
  setMaxShellSize = async () => {
    const {shellMappingContract} = this.state;
    const maxShellSize = await shellMappingContract.methods
      .maxShellSize()
      .call();
    this.setState({maxShellSize: Number(maxShellSize)});
  };

  /**
   * set user default shell
   */
  setDefaultShellMap = async () => {
    const {account} = this.props;
    const {defaultShellMap, shellMappingContract} = this.state;
    await shellMappingContract.methods
      .modifyShell(defaultShellMap)
      .send({from: account});
  };

  /**
   * get users shell map from contract
   */
  getShellMap = async () => {
    const {web3} = this.props;
    const {maxShellSize, shellMappingContract} = this.state;
    const localAccounts = await web3.eth.getAccounts();
    const tokenContracts = [];
    for (let i = 0; i < maxShellSize; i++) {
      try {
        const tokenContract = await shellMappingContract.methods
          .shellMap(localAccounts[0], i)
          .call();
        tokenContracts.push(tokenContract);
      } catch (e) {
        // TODO: server side logging -- no more contracts in shell map
        break;
      }
    }
    if (tokenContracts.length > 0) {
      this.setState({cowriShellMap: tokenContracts}, () => {
        const {cowriShellMap} = this.state;
        this.buildLocalShell(cowriShellMap);
      });
    } else {
      // prompt user to create shell
      // console.log('create shell!');
    }
  };

  /**
   * build local shell (in parrallel)
   */
  buildLocalShell = async cowriShellMap => {
    const {web3} = this.props;
    const localAccounts = await web3.eth.getAccounts();
    const updatedLocalShell = [];
    await Promise.all(
      cowriShellMap.map(async contractAddress => {
        const tokenContract = await new web3.eth.Contract(
          ShellABI,
          contractAddress,
        );
        const contractBalance = await tokenContract.methods
          .balanceOf(localAccounts[0])
          .call();
        const [asset, decimals, symbol] = await Promise.all([
          tokenContract.methods.name().call(),
          tokenContract.methods.decimals().call(),
          tokenContract.methods.symbol().call(),
        ]);
        const quantity = convertValueFromTokenDecimals(
          contractBalance,
          decimals,
        );
        const price = 1;
        const total = quantity * price;
        const address = contractAddress;

        if (quantity > 0) {
          updatedLocalShell.push({
            address,
            asset,
            price,
            quantity,
            symbol,
            total,
          });
        }
      }),
    );

    this.setState({localShell: updatedLocalShell}, () => {
      const {localShell} = this.state;
      this.getCowriBalance(localShell);
    });
  };

  /**
   * get cowri balance
   */
  getCowriBalance = localShell => {
    const price = 1;
    const symbol = 'wri';
    const asset = 'Cowri';
    const address = '0x0000';
    const quantity = localShell.reduce(
      (currentQuantity, token) => currentQuantity + token.quantity,
      0,
    );
    const total = quantity * price;
    const cowriToken = {
      address,
      asset,
      price,
      quantity,
      symbol,
      total,
    };

    this.setState({cowriToken});
  };

  render() {
    const {cowriToken, localShell} = this.state;
    return (
      <div className='account-balances-container'>
        <Table columns={this.DATA_COLUMNS} rows={[cowriToken, ...localShell]} />
      </div>
    );
  }
}

export default AccountBalances;
