import React from 'react';
import ShellABI from '../ShellABI';
import { convertValueToTokenDecimals } from '../utils/utils';
// import Transaction from '../models/Transaction';

class SendModal extends React.PureComponent {
  state = {
    recipientAddress: '',
  };

  // submitTransfer = () => {
  //   const { recipientAddress } = this.state;
  //   const { account, web3 } = this.props;
  //   try {
  //     if (!web3.utils.isAddress(recipientAddress)) {
  //       throw new Error('Invalid address!');
  //     }
  //   } catch (error) {
  //     /**
  //      * Display errors to user
  //      * check for error being instance of InvalidAddress error
  //      * check for error beign instance of Transaction error
  //      */
  //     console.error(error);
  //   }
  // };

  /**
   * Submits transfer to address from state
   */
  sendTransaction = async (
    receiverTokenAddress = '0xB9Bee603BD1449ADeB9a9Babd73e9b19f4Df5D50',
    receiverTokenAmount = '10',
  ) => {
    const { web3 } = this.props;
    try {
      // make sure balance can support transfer
      const accounts = await web3.eth.getAccounts();
      // const transferList = this.convertCowriToStableTokens(
      //   this.state.localShell,
      //   this.state.cowriToken.balance,
      //   receiverTokenAmount,
      // );
      // await Promise.all(
      // transferList.map(async transfer => {
      const token = await new web3.eth.Contract(
        ShellABI,
        '0xad31da2bfd3113394745954445359caacb54bfef',
      );
      const tokenDecimals = await token.methods.decimals().call();
      const tokenValue = convertValueToTokenDecimals(
        receiverTokenAmount,
        tokenDecimals,
      );
      console.log('token', token);
      console.log('tokenDecimals', tokenDecimals);
      console.log('tokenValue', tokenValue);
      console.log('tokenValue type', typeof tokenValue);
      await token.methods
        .transfer(receiverTokenAddress, String(tokenValue))
        .send({ from: accounts[0] })
        .then(async txObject => {
          console.log('tx', txObject);
          // get updated shell
          // await this.getShellMap();
        })
        .catch(() => {
          throw new Error('User denied transaction signature.');
        });
      console.log('did not wait');
      // }),
      // );
    } catch (error) {
      console.error(error);
    }
  };

  onReceipientAddressChange = event => {
    const target = event.target.value;
    this.setState(({ recipientAddress }) => ({
      recipientAddress: target,
    }));
  };

  render() {
    const { closeModal } = this.props;
    return (
      <div className='modal-backdrop'>
        <div className='send-modal-container'>
          <div className='send-modal-form'>
            <div className='send-modal-form-container'>
              <div className='send-modal-input address-input'>
                <label htmlFor='wallet-address'>
                  <i className='fas fa-arrow-circle-up btn-icon' />
                  Send from Metamask Wallet
                </label>
                <input
                  type='text'
                  className='wallet-address'
                  placeholder='Cowri'
                  disabled
                />
              </div>
              <div className='send-modal-input recipient-input'>
                <label htmlFor='recipient-address'>Recipient Address</label>
                <input
                  className='recipient-address'
                  onChange={this.onReceipientAddressChange}
                  placeholder='0x...'
                  type='text'
                />
              </div>
              <div className='send-modal-input amount-input'>
                <label htmlFor='cowri-amount'>Amount</label>
                <input type='text' className='cowri-amount' placeholder='0.0' />
              </div>
              <div className='send-button-group-container'>
                <button
                  className='btn btn-cancel no-margin'
                  value='submit'
                  onClick={() => closeModal(false)}>
                  Cancel
                </button>
                <span className='send-modal-fee'>Fee: $0.014</span>
                <button
                  className='btn btn-send no-margin'
                  value='submit'
                  onClick={() => this.sendTransaction()}>
                  <i className='fas fa-arrow-circle-up btn-icon' />
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SendModal;
